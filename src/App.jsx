import { useState, useEffect } from 'react';
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

export default function App() {
  const [contacts, setContacts] = useState(LIST_CONTACTS);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const storage = window.localStorage.getItem('contacts');
    const parselContacts = JSON.parse(storage);
    if (parselContacts) {
      setContacts(parselContacts);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const formSubmitHandler = (name, number) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    addContact(contact);
  };

  const addContact = contact => {
    const { name } = contact;

    if (isExist(contacts, name)) {
      alert(`${name} is already in contacts.`);
      return;
    }

    setContacts([contact, ...contacts]);
  };

  const isExist = (contacts, name) => {
    return contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
  };

  const handlerFilterChange = e => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleContact = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const displayAll = () => {
    setFilter('');
  };

  const deleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const visibleContact = getVisibleContact();

  return (
    <>
      <Section title="Phonebook">
        <ContactForm onFormHandler={formSubmitHandler} />
      </Section>

      <Section title="Contacts">
        {contacts.length !== 0 ? (
          <>
            <Filter
              value={filter}
              onHandlerFilterChange={handlerFilterChange}
              onDisplayAll={displayAll}
            />
            <ContactList
              contacts={visibleContact}
              onDeleteContact={deleteContact}
            />
          </>
        ) : (
          <Notification message="The contact list is empty" />
        )}
      </Section>
    </>
  );
}
