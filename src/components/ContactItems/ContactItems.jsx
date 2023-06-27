import PropTypes from 'prop-types';
import css from './ContactItems.module.css';

export default function ContactItems({ id, name, number, onDeleteContact }) {
  return (
    <li className={css.item}>
      <span className={css.marker}></span>
      <p className={css.label}>{name}:</p>
      <p className={css.quantity}>{number}</p>
      <button
        type="button"
        className={css.button}
        onClick={() => onDeleteContact(id)}
      >
        Delete
      </button>
    </li>
  );
}

ContactItems.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
