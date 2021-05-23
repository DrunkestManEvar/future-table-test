import { useDispatch } from 'react-redux';
import { dismissError } from '../../../features/people/peopleSlice';
import Overlay from '../Overlay/Overlay';
import CustomButton from '../CustomButton/CustomButton';
import { AiFillWarning } from 'react-icons/ai';
import { FaGrinWink } from 'react-icons/fa';

const Modal = ({ modalContent, modalError }) => {
  const dispatch = useDispatch();

  const modalClasses = ['modal'];

  if (modalError) modalClasses.push('modal--error');

  const modalBtnClasses = modalClasses.map(
    modalClass => `${modalClass}__button`
  );

  const modalSignClasses = modalClasses.map(
    modalClass => `${modalClass}__sign`
  );

  const handleRemoveError = () => dispatch(dismissError());

  return (
    <Overlay>
      <div className={modalClasses.join(' ')}>
        {modalContent}
        {modalError && <p>Press ОК to load test data</p>}
        {modalError ? (
          <AiFillWarning className={modalSignClasses.join(' ')} />
        ) : (
          <FaGrinWink className={modalSignClasses.join(' ')} />
        )}
        {modalError && (
          <CustomButton
            handleClick={handleRemoveError}
            classes={modalBtnClasses.join(' ')}
          >
            OK
          </CustomButton>
        )}
      </div>
    </Overlay>
  );
};

export default Modal;
