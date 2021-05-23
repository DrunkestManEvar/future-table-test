import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nullifyFilteredPeopleStatus } from '../../../features/people/peopleSlice';

const ScreenCornerNotification = ({ status }) => {
  const filteredPeopleDataLength = useSelector(
    state => state.people.filteredPeopleData
  )?.length;
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => dispatch(nullifyFilteredPeopleStatus()), 2000);
  }, [dispatch]);

  return (
    <div className="screen-corner-notification">
      <p>
        {status}{' '}
        {filteredPeopleDataLength &&
          `Matching people found: ${filteredPeopleDataLength}`}
      </p>
    </div>
  );
};

export default ScreenCornerNotification;
