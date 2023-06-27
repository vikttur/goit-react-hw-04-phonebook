import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import css from './Filter.module.css';

export default function Filter({ value, onHandlerFilterChange, onDisplayAll }) {
  const filterInputId = nanoid();

  return (
    <label htmlFor={filterInputId} className={css.inputBlock}>
      Find contacts by name
      <input
        type="text"
        name="name"
        id={filterInputId}
        className={css.inputField}
        value={value}
        placeholder="Enter name"
        onChange={onHandlerFilterChange}
      />
      <button type="button" onClick={() => onDisplayAll()}>
        Show all
      </button>
    </label>
  );
}

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onHandlerFilterChange: PropTypes.func.isRequired,
  onDisplayAll: PropTypes.func.isRequired,
};
