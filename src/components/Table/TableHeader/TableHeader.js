import TableHeading from './TableHeading/TableHeading';

const TableHeader = ({headerBlueprint}) => {

  const columnHeadings = Object.keys(headerBlueprint);
  const headerContent = columnHeadings.map((heading, index) => <TableHeading key={headerBlueprint.id + index} heading={heading} />);

  return (
    <thead className="table__header">
      <tr>
        {headerContent}
      </tr>
    </thead>
  )
};

export default TableHeader;