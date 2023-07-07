import { useState, useRef } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import css from './ContactForm.module.css';

const INITIAL = {
  name: '',
  number: '',
};

export default function ContactForm({ onFormHandler }) {
  const [name, setName] = useState(INITIAL.name);
  const [number, setNumber] = useState(INITIAL.number);

  const nameInputId = useRef(nanoid());
  const numberInputId = useRef(nanoid());

  const handleInputChange = e => {
    const { name, value } = e.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    onFormHandler(name, number);
    reset();
  };

  const reset = () => {
    setName(INITIAL.name);
    setNumber(INITIAL.number);
  };

  return (
    <form className={css.contactForm} onSubmit={handleSubmit}>
      <label htmlFor={nameInputId} className={css.inputBlock}>
        Name
        <input
          type="text"
          name="name"
          id={nameInputId}
          className={css.inputField}
          value={name}
          placeholder="Enter name"
          // pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          // title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          // required
          onChange={handleInputChange}
        />
      </label>

      <label htmlFor={numberInputId} className={css.inputBlock}>
        Number
        <input
          type="tel"
          name="number"
          id={numberInputId}
          className={css.inputField}
          value={number}
          placeholder="Enter the phone number"
          // pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          // title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          // required
          onChange={handleInputChange}
        />
      </label>

      <button type="submit">Add contact</button>
    </form>
  );
}

ContactForm.propTypes = {
  onFormHandler: PropTypes.func.isRequired,
};
