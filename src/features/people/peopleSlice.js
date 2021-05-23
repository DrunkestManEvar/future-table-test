import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { testPeopleData } from '../../testPeopleData';
import {
  sortDownwards,
  sortUpwards,
  checkIfContainsValue,
  transformPhoneNumber,
} from '../../shared/utility';

// Proxy prefixes to deploy to Netlify
const API_SHORT_LIST_ENDPOINT =
  'https://infinite-plains-87110.herokuapp.com/http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';
const API_LONG_LIST_ENDPOINT =
  'https://infinite-plains-87110.herokuapp.com/http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';

const initialState = {
  dataFormat: null,
  peopleData: [],
  filteredPeopleData: null,
  filteredPeopleDataStatus: null,
  currentPerson: null,
  status: 'idle',
  error: null,
  sort: {
    sortedBy: null,
    sortDirection: null,
  },
};

export const fetchPeople = createAsyncThunk(
  'people/fetchPeople',
  async fetchOption => {
    try {
      const url =
        fetchOption === 'long'
          ? API_LONG_LIST_ENDPOINT
          : API_SHORT_LIST_ENDPOINT;
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {
    setDataFormat: (state, action) => {
      state.dataFormat = action.payload;
    },
    sortByHeading: (state, action) => {
      const fieldType = action.payload;

      if (
        state.sort.sortedBy === fieldType &&
        state.sort.sortDirection === 'down'
      ) {
        state.sort.sortDirection = 'up';

        return sortUpwards(state.peopleData, fieldType);
      }

      if (
        state.sort.sortedBy === fieldType &&
        state.sort.sortDirection === 'up'
      ) {
        state.sort.sortDirection = 'down';

        return sortDownwards(state.peopleData, fieldType);
      }

      if (state.sort.sortedBy !== fieldType) {
        state.sort.sortDirection = 'down';

        state.sort.sortedBy = fieldType;

        return sortDownwards(state.peopleData, fieldType);
      }
    },
    dismissError: (state, action) => {
      state.error = null;
      state.peopleData = testPeopleData;
    },
    filterPeopleData: (state, action) => {
      const searchQuery = action.payload.toLowerCase();

      if (!searchQuery.trim()) {
        state.filteredPeopleData = null;
        return;
      }

      const filteredData = state.peopleData.filter(person =>
        checkIfContainsValue(person, searchQuery)
      );

      if (!filteredData.length) {
        state.filteredPeopleData = null;
        state.filteredPeopleDataStatus = 'Not Found!';
      }

      if (filteredData.length) {
        state.filteredPeopleData = filteredData;
        state.filteredPeopleDataStatus = 'Success!';
      }
    },
    nullifyFilteredPeopleStatus: (state, action) => {
      state.filteredPeopleDataStatus = null;
    },
    addPerson: {
      reducer(state, action) {
        const addedPerson = action.payload;
        state.peopleData.unshift(addedPerson);
      },
      prepare(formData) {
        const { firstName, lastName, email, phone: enteredPhone } = formData;
        const id = Number(formData.id);
        const phone = transformPhoneNumber(enteredPhone);

        const address = 'Not Found';
        const description = address;

        return {
          payload: {
            id,
            firstName,
            lastName,
            email,
            phone,
            address,
            description,
          },
        };
      },
    },
    selectCurrentPerson: {
      reducer(state, action) {
        const { currentId, currentFirstName, currentLastName } = action.payload;
        state.currentPerson = state.peopleData.find(
          person =>
            person.id === currentId &&
            person.firstName === currentFirstName &&
            person.lastName === currentLastName
        );
      },
      prepare(currentId, currentFirstName, currentLastName) {
        return {
          payload: {
            currentId,
            currentFirstName,
            currentLastName,
          },
        };
      },
    },
  },
  extraReducers: {
    [fetchPeople.pending]: (state, action) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchPeople.fulfilled]: (state, action) => {
      state.peopleData = state.peopleData.concat(action.payload);
      state.status = 'fulfilled';
      state.error = null;
    },
    [fetchPeople.rejected]: (state, action) => {
      state.error = 'Не удалось получить данные...';
      state.status = 'rejected';
    },
  },
});

export const {
  setDataFormat,
  sortByHeading,
  dismissError,
  filterPeopleData,
  nullifyFilteredPeopleStatus,
  selectCurrentPerson,
  addPerson,
} = peopleSlice.actions;

export default peopleSlice.reducer;
