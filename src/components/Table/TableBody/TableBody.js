import TableRow from '../TableRow/TableRow';

const TableBody = ({ data }) => {
  const tableBodyContent = data.map(person => (
    <TableRow key={person.id + Math.random()} person={person} />
  ));

  return <tbody>{tableBodyContent}</tbody>;
};

export default TableBody;
