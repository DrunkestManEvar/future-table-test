const TableDataCell = ({ children, shouldCenter }) => {
  const cellClasses = shouldCenter ? 'table-data-cell--center' : 'table-data-cell';

  return (
    <td className={cellClasses}>
      {children}
    </td>
  )
};

export default TableDataCell;