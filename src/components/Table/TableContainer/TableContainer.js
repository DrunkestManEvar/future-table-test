import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPeople } from '../../../features/people/peopleSlice';
import AddPersonForm from '../../UI/AddPersonForm/AddPersonForm';
import TableHeader from '../TableHeader/TableHeader';
import TableBody from '../TableBody/TableBody';
import CurrentPersonContainer from '../../UI/CurrentPersonContainer/CurrentPersonContainer';
import PaginationContainer from '../../UI/PaginationContainer/PaginationContainer';
import Loader from '../../UI/Loader/Loader';

const generatePersonBlueprint = peopleData => {
  return peopleData.reduce((acc, curr) => {
    const numberOfAccKeys = Object.keys(acc).length;
    const numberOfCurrKeys = Object.keys(curr).length;

    return numberOfCurrKeys > numberOfAccKeys ? curr : acc;
  }, {});
};

const TableContainer = ({ dataFormat }) => {
  const peopleData = useSelector(state => state.people.peopleData);
  const filteredPeopleData = useSelector(
    state => state.people.filteredPeopleData
  );
  const peopleSliceStatus = useSelector(state => state.people.status);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  const goForward = () => setCurrentPage(prevState => prevState + 1);
  const goBack = () => setCurrentPage(prevState => prevState - 1);

  let personBlueprint, tableContent;

  useEffect(() => {
    if (peopleSliceStatus !== 'idle') return;
    else dispatch(fetchPeople(dataFormat));
  }, [dataFormat, peopleSliceStatus, dispatch]);

  if (peopleData.length) {
    personBlueprint = generatePersonBlueprint(peopleData);

    const firstPersonOnPage = (currentPage - 1) * 10;
    const lastPersonOnPage = currentPage * 10;

    tableContent =
      filteredPeopleData?.slice(firstPersonOnPage, lastPersonOnPage) ??
      peopleData.slice(firstPersonOnPage, lastPersonOnPage);

    return (
      <div className="table-container">
        <AddPersonForm formBlueprint={personBlueprint} />
        <table className="table">
          <TableHeader headerBlueprint={personBlueprint} />
          <TableBody data={tableContent} />
        </table>
        <CurrentPersonContainer />
        <PaginationContainer
          numberOfEntriesLeft={peopleData.length - currentPage * 10}
          currentPage={currentPage}
          goForward={goForward}
          goBack={goBack}
        />
      </div>
    );
  }

  return <Loader />;
};

export default TableContainer;
