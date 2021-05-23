const SortArrow = ({ visible, direction }) => {
  const sortArrowClasses = ['sort-arrow'];

  if (direction === 'up') sortArrowClasses.push('sort-arrow--up');
  if (direction === 'down') sortArrowClasses.push('sort-arrow--down');

  if (visible) sortArrowClasses.push('visible');

  return <i className={sortArrowClasses.join(' ')}></i>;
};

export default SortArrow;
