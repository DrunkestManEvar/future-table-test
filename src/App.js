import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setDataFormat } from './features/people/peopleSlice';
import Modal from './components/UI/Modal/Modal';
import ScreenCornerNotification from './components/UI/ScreenCornerNotification/ScreenCornerNotification';
import TableContainer from './components/Table/TableContainer/TableContainer';
import SearchForm from './components/UI/SearchForm/SearchForm';
import { BiGridSmall } from 'react-icons/bi';
import { CgMenuGridR } from 'react-icons/cg';

const App = () => {
  const dataFormat = useSelector(state => state.people.dataFormat);
  const peopleDataError = useSelector(state => state.people.error);
  const filteredPeopleDataStatus = useSelector(
    state => state.people.filteredPeopleDataStatus
  );
  const dispatch = useDispatch();

  let modalContent;

  if (peopleDataError) modalContent = <p>{peopleDataError}</p>;

  if (!dataFormat)
    modalContent = (
      <div className="data-format-container">
        <h3 className="data-format-container__heading">
          Choose a data format:
        </h3>
        <div
          onClick={() => dispatch(setDataFormat('short'))}
          className="data-format-container__option"
        >
          <BiGridSmall />
          <p>Short</p>
        </div>
        <div
          onClick={() => dispatch(setDataFormat('long'))}
          className="data-format-container__option"
        >
          <CgMenuGridR />
          <p>Long</p>
        </div>
      </div>
    );

  if (peopleDataError || !dataFormat)
    return <Modal modalContent={modalContent} modalError={peopleDataError} />;

  return (
    <>
      <SearchForm />
      <TableContainer dataFormat={dataFormat} />
      {filteredPeopleDataStatus && (
        <ScreenCornerNotification status={filteredPeopleDataStatus} />
      )}
    </>
  );
};

export default App;
