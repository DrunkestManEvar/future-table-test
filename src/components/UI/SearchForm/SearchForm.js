import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { filterPeopleData } from '../../../features/people/peopleSlice';
import CustomButton from '../CustomButton/CustomButton';

const SearchInput = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();

  const handleFormSubmit = e => {
    e.preventDefault();
    dispatch(filterPeopleData(searchQuery));
    setSearchQuery('');
  };

  return (
    <form className="search-form" onSubmit={handleFormSubmit}>
      <label htmlFor="search">Find a person based on a value</label>
      <input
        id="search"
        name="search"
        type="text"
        placeholder="(e.g. phone number, city, etc.)"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        className="search-form__input--text"
      />
      <CustomButton classes="form__submit-btn" handleClick={filterPeopleData}>
        Find
      </CustomButton>
    </form>
  );
};

export default SearchInput;
