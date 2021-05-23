import { useDispatch } from 'react-redux';
import { selectCurrentPerson } from '../../../features/people/peopleSlice';
import TableDataCell from './TableDataCell/TableDataCell';

const generateDataValue = (dataToGenerateFrom, personId) => {
  return Object.entries(dataToGenerateFrom).map(keyValueArray => {
    const [key, value] = keyValueArray;
    return (
      <p key={personId + value + key} className="table-cell__para">
        <span>{key}</span>: {value}
      </p>
    );
  });
};

const generatePersonTableCells = person => {
  const personData = Object.entries(person).map(keyDataArray => {
    const [key, data] = keyDataArray;

    if (!data) return <TableDataCell key={person.id}>Not Found</TableDataCell>;

    if (typeof data === 'object')
      return (
        <TableDataCell
          shouldCenter={key !== 'description'}
          key={person.id + data + key}
        >
          {generateDataValue(data, person.id)}
        </TableDataCell>
      );
    else
      return (
        <TableDataCell
          shouldCenter={key !== 'description'}
          key={person.id + data + key}
        >
          {data}
        </TableDataCell>
      );
  });

  return personData;
};

const TableRow = ({ person }) => {
  const dispatch = useDispatch();

  const setPerson = () =>
    dispatch(selectCurrentPerson(person.id, person.firstName, person.lastName));

  return <tr onClick={setPerson}>{generatePersonTableCells(person)}</tr>;
};

export default TableRow;
