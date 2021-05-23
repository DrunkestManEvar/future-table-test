import { configureStore } from '@reduxjs/toolkit';

import peopleReducer from '../features/people/peopleSlice';

export default configureStore({
  reducer: {
    people: peopleReducer,
  },
});
