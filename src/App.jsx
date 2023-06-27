import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import Section from './components/Section/Section';
import ContactForm from './components/ContactForm/ContactForm';
import Filter from './components/Filter/Filter';
import ContactList from './components/ContactList/ContactList';
import Notification from './components/Notification/Notification';

const LIST_CONTACTS = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export default class App extends Component {
  state = {
    contacts: LIST_CONTACTS,
    filter: '',
  };

  formSubmitHandler = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    this.addContact(contact);
  };

  addContact = contact => {
    const { contacts } = this.state;
    const { name } = contact;

    if (this.isExist(contacts, name)) {
      alert(`${name} is already in contacts.`);
      return;
    }

    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts],
    }));
  };

  isExist = (contacts, name) => {
    return contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
  };

  handlerFilterChange = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContact = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  DisplayAll = () => {
    this.setState({ filter: '' });
  };

  deleteContact = id => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== id),
    }));
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parselContacts = JSON.parse(contacts);

    if (parselContacts) {
      this.setState({ contacts: parselContacts });
    }
  }

  componentDidUpdate(prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const { contacts, filter } = this.state;
    const visibleContact = this.getVisibleContact();

    return (
      <>
        <Section title="Phonebook">
          <ContactForm onFormHandler={this.formSubmitHandler} />
        </Section>

        <Section title="Contacts">
          {contacts.length !== 0 ? (
            <>
              <Filter
                value={filter}
                onHandlerFilterChange={this.handlerFilterChange}
                onDisplayAll={this.DisplayAll}
              />
              <ContactList
                contacts={visibleContact}
                onDeleteContact={this.deleteContact}
              />
            </>
          ) : (
            <Notification message="The contact list is empty" />
          )}
        </Section>
      </>
    );
  }
}
