const CustomButton = ({ handleClick, children, classes, disabled }) => {
  return (
    <button disabled={disabled} onClick={handleClick} className={classes}>
      {children}
    </button>
  );
};

export default CustomButton;
