import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import css from './ContactForm.module.css';

const INITIAL_STATE = {
  name: '',
  number: '',
};

export default class ContactForm extends Component {
  state = {
    ...INITIAL_STATE,
  };

  nameInputId = nanoid();
  numberInputId = nanoid();

  handleInputChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.onFormHandler(this.state);
    this.reset();
  };

  reset = () => {
    this.setState({ ...INITIAL_STATE });
  };

  render() {
    const { name, number } = this.state;

    return (
      <form className={css.contactForm} onSubmit={this.handleSubmit}>
        <label htmlFor={this.nameInputId} className={css.inputBlock}>
          Name
          <input
            type="text"
            name="name"
            id={this.nameInputId}
            className={css.inputField}
            value={name}
            placeholder="Enter name"
            // pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            // title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            // required
            onChange={this.handleInputChange}
          />
        </label>

        <label htmlFor={this.numberInputId} className={css.inputBlock}>
          Number
          <input
            type="tel"
            name="number"
            id={this.numberInputId}
            className={css.inputField}
            value={number}
            placeholder="Enter the phone number"
            // pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            // title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            // required
            onChange={this.handleInputChange}
          />
        </label>

        <button type="submit">Add contact</button>
      </form>
    );
  }
}

ContactForm.propTypes = {
  onFormHandler: PropTypes.func.isRequired,
};
