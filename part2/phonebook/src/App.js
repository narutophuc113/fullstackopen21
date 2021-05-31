import React, {useState} from 'react'
import Filter from "./module/Filter";
import PersonForm from "./module/PersonForm";
import Persons from "./module/Persons";

const App = () => {
    const [persons, setPersons] = useState([
        {name: 'Arto Hellas', number: '040-123456'},
        {name: 'Ada Lovelace', number: '39-44-5323523'},
        {name: 'Dan Abramov', number: '12-43-234345'},
        {name: 'Mary Poppendieck', number: '39-23-6423122'}
    ]);

    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filter, setFilter] = useState('');
    const filterContacts = (filter === '') ? persons : persons.filter(contact => contact.name.includes(filter));

    const addContact = (event) => {
        event.preventDefault();
        const found = persons.find(person => person.name === newName);
        if (found) {
            alert(`${newName} is already added to phonebook`);
        } else {
            const newPerson = {
                name: newName,
                number: newNumber
            };
            console.log('aaaaaaa')
            setNewName('');
            setNewNumber('');
            setPersons(persons.concat(newPerson));
        }
    };

    const handleNameChange = (event) => {
        setNewName(event.target.value);
    };

    const handlePhoneChange = (event) => {
        setNewNumber(event.target.value);
    };

    const handleFilter = (event) => {
        setFilter(event.target.value);
    };

    return (
        <div>
            <h2>Phonebook</h2>

            <Filter filter={filter} handleEvent={handleFilter}/>

            <h3>add a new</h3>

            <PersonForm formAction={addContact} name={{value: newName, event: handleNameChange}}
                        number={{value: newNumber, event: handlePhoneChange}}/>

            <h3>Numbers</h3>

            <Persons contacts={filterContacts}/>
        </div>
    )
}

export default App