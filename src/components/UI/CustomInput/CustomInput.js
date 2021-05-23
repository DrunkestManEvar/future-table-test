const Input = ({ invalid, touched, changed, inputConfig, value, label }) => {
  const inputClasses = ['form__input'];

  if (invalid && touched) inputClasses.push('form__input--invalid');

  const inputElement = (
    <input
      className={inputClasses.join(' ')}
      {...inputConfig}
      value={value}
      onChange={changed}
    />
  );

  return (
    <div>
      <label className="form__label">{label}</label>
      {inputElement}
    </div>
  );
};

export default Input;
