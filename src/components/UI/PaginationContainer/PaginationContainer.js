import CustomButton from '../CustomButton/CustomButton';

const PaginationContainer = ({
  numberOfEntriesLeft,
  currentPage,
  goForward,
  goBack,
}) => {
  const containerClasses = ['pagination-container'];

  if (currentPage === 1)
    containerClasses.push('pagination-container--first-page');

  let buttons;

  if (currentPage === 1 && numberOfEntriesLeft > 1) {
    buttons = (
      <CustomButton classes="pagination-btn" handleClick={goForward}>
        Go to Page {currentPage + 1}
      </CustomButton>
    );
  }

  if (currentPage > 1 && numberOfEntriesLeft > 1) {
    buttons = (
      <>
        <CustomButton classes="pagination-btn" handleClick={goBack}>
          Go to Page {currentPage - 1}
        </CustomButton>
        <CustomButton classes="pagination-btn" handleClick={goForward}>
          Go to Page {currentPage + 1}
        </CustomButton>
      </>
    );
  }

  if (currentPage > 1 && numberOfEntriesLeft <= 0) {
    buttons = (
      <CustomButton classes="pagination-btn" handleClick={goBack}>
        Go to Page {currentPage - 1}
      </CustomButton>
    );
  }

  return <div className={containerClasses.join(' ')}>{buttons}</div>;
};

export default PaginationContainer;
