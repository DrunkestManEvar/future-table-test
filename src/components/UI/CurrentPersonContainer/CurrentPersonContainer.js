import { useSelector } from 'react-redux';

const CurrentPersonContainer = () => {
  const currentPerson = useSelector(state => state.people.currentPerson);

  let content;

  if (!currentPerson) return null;

  const {
    firstName,
    lastName,
    address: { streetAddress, city, state, zip },
    description,
  } = currentPerson;

  if (currentPerson)
    content = (
      <>
        <p>
          Selected User:{' '}
          <b>
            {firstName} {lastName}
          </b>
        </p>
        <p>Description:</p>
        <textarea readOnly value={description}></textarea>
        <p>
          Street: <b>{streetAddress}</b>
        </p>
        <p>
          City: <b>{city}</b>
        </p>
        <p>
          Province/state: <b>{state}</b>
        </p>
        <p>
          ZIP code: <b>{zip}</b>
        </p>
      </>
    );

  return <article className="current-person-container">{content}</article>;
};

export default CurrentPersonContainer;
