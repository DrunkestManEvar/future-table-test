export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

export const checkInputValidity = (inputValue, validityRules) => {
  let isValid = true;

  if (!validityRules) return isValid;

  if (validityRules.isEmail) {
    const pattern =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(inputValue) && isValid;
  }

  if (validityRules.isNumeric) {
    const pattern = /^\d+$/;
    isValid = pattern.test(inputValue) && isValid;
  }

  if (validityRules.isPhone) {
    const pattern =
      /^[\\+]?[(]?[0-9]{3}[)]?[-\s\\.]?[0-9]{3}[-\s\\.]?[0-9]{4,6}$/im;
    isValid = pattern.test(inputValue) && isValid;
  }

  if (validityRules.isRequired) isValid = inputValue.trim() !== '' && isValid;

  if (validityRules.minLength)
    isValid = inputValue.trim().length >= validityRules.minLength && isValid;

  if (validityRules.maxLength)
    isValid = inputValue.trim().length <= validityRules.maxLength && isValid;

  return isValid;
};

export const sortDownwards = (arrayToSort, fieldType) => {
  arrayToSort.sort((firstEl, secondEl) => {
    const firstElField = firstEl[fieldType];
    const secondElField = secondEl[fieldType];

    if (firstElField < secondElField) return -1;
    if (firstElField > secondElField) return 1;
    else return 0;
  });
};

export const sortUpwards = (arrayToSort, fieldType) => {
  arrayToSort.sort((firstEl, secondEl) => {
    const firstElField = firstEl[fieldType];
    const secondElField = secondEl[fieldType];

    if (firstElField > secondElField) return -1;
    if (firstElField < secondElField) return 1;
    else return 0;
  });
};

export const checkIfContainsValue = (object, searchQuery) => {
  for (let value of Object.values(object)) {
    if (typeof value === 'string' && value.toLowerCase() === searchQuery)
      return object;

    if (typeof value === 'number' && value === Number(searchQuery))
      return object;

    if (typeof value === 'object')
      return checkIfContainsValue(value, searchQuery);
  }
};

export const transformPhoneNumber = phoneString => {
  if (phoneString.length === 10)
    return phoneString
      .split('')
      .map((phoneDigit, index) => {
        if (index === 0) return `(${phoneDigit}`;
        else if (index === 2) return `${phoneDigit})`;
        else if (index === 5) return `${phoneDigit}-`;
        else return phoneDigit;
      })
      .join('');
  else return phoneString;
};
