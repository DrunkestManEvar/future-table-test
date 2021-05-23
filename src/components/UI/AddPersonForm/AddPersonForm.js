import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPerson } from '../../../features/people/peopleSlice';
import { updateObject, checkInputValidity } from '../../../shared/utility';
import CustomButton from '../CustomButton/CustomButton';
import CustomInput from '../CustomInput/CustomInput';

const initialAddFormState = {
  id: {
    inputConfig: {
      type: 'number',
      placeholder: 'e.g. 69',
    },
    value: '',
    validation: {
      isRequired: true,
      isNumeric: true,
      minLength: 1,
      maxLength: 5,
    },
    isValid: false,
    hasBeenTouched: false,
  },
  firstName: {
    inputConfig: {
      type: 'text',
      placeholder: 'e.g. Harrison',
    },
    value: '',
    validation: {
      isRequired: true,
    },
    isValid: false,
    hasBeenTouched: false,
  },
  lastName: {
    inputConfig: {
      type: 'text',
      placeholder: 'e.g. Wells',
    },
    value: '',
    validation: {
      isRequired: true,
    },
    isValid: false,
    hasBeenTouched: false,
  },
  email: {
    inputConfig: {
      type: 'email',
      placeholder: 'e.g. wells@cc.com',
    },
    value: '',
    validation: {
      isRequired: true,
      isEmail: true,
    },
    isValid: false,
    hasBeenTouched: false,
  },
  phone: {
    inputConfig: {
      type: 'phone',
      placeholder: 'e.g. (123)456-7890',
    },
    value: '',
    validation: {
      isRequired: true,
      isPhone: true,
    },
    isValid: false,
    hasBeenTouched: false,
  },
};

const AddPersonForm = ({ formBlueprint }) => {
  const [isFormVisible, setIfFormVisible] = useState(false);
  const [addPersonForm, setAddPersonForm] = useState(initialAddFormState);
  const [isFormValid, setIsFormValid] = useState(false);

  const dispatch = useDispatch();

  const handleFormSubmit = e => {
    e.preventDefault();

    const formData = {};
    for (const inputIdentifier in addPersonForm) {
      formData[inputIdentifier] = addPersonForm[inputIdentifier].value;
    }

    dispatch(addPerson(formData));

    setAddPersonForm(initialAddFormState);
    setIsFormValid(false);
  };

  const handleInputChange = (e, inputIdentifier) => {
    const inputNewValue = e.target.value;

    setAddPersonForm(prevForm => {
      const newInputElement = updateObject(prevForm[inputIdentifier], {
        value: inputNewValue,
        hasBeenTouched: true,
        isValid: checkInputValidity(
          inputNewValue,
          prevForm[inputIdentifier].validation
        ),
      });
      const newAddPersonForm = updateObject(addPersonForm, {
        [inputIdentifier]: newInputElement,
      });

      setIsFormValid(() => {
        const isNewFormValid = Object.keys(newAddPersonForm)
          .map(inputIdentifier => newAddPersonForm[inputIdentifier].isValid)
          .every(isValidBoolean => isValidBoolean === true);

        return isNewFormValid;
      });

      return newAddPersonForm;
    });
  };

  const formInputs = [];
  for (const key in addPersonForm) {
    formInputs.push({ ...addPersonForm[key], id: key });
  }

  let formContent;

  if (isFormVisible)
    formContent = (
      <form className="add-person-form" onSubmit={handleFormSubmit}>
        {formInputs.map(input => (
          <CustomInput
            key={input.id}
            inputType={input.inputConfig.type}
            inputConfig={input.inputConfig}
            value={input.value}
            invalid={!input.isValid}
            touched={input.hasBeenTouched}
            label={input.id}
            changed={e => handleInputChange(e, input.id)}
          />
        ))}
        <CustomButton
          classes="form__submit-btn center-btn"
          disabled={!isFormValid}
        >
          Add
        </CustomButton>
      </form>
    );

  if (!isFormVisible)
    formContent = (
      <CustomButton
        classes="regular-button"
        handleClick={() => setIfFormVisible(true)}
      >
        Click to add new Person
      </CustomButton>
    );

  return formContent;
};

export default AddPersonForm;
