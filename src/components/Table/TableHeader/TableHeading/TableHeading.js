import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sortByHeading } from '../../../../features/people/peopleSlice';
import SortArrow from '../../../UI/SortArrow/SortArrow';

const TableHeading = ({ heading }) => {
  const sortedBy = useSelector(state => state.people.sort.sortedBy);
  const sortDirection = useSelector(state => state.people.sort.sortDirection);
  const dispatch = useDispatch();

  const [hovered, setHovered] = useState(false);

  const headingClasses = ['table__heading'];

  if (sortedBy === heading) headingClasses.push('table__heading--sorted');

  const handleClick = () => {
    dispatch(sortByHeading(heading));
  };

  return (
    <th
      className={headingClasses.join(' ')}
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {heading}
      <SortArrow
        visible={sortedBy === heading || hovered}
        direction={sortDirection}
      />
    </th>
  );
};

export default TableHeading;
