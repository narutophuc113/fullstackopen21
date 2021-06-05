import React, { useState, useEffect } from 'react'
import Filter from "./module/Filter";
import PersonForm from "./module/PersonForm";
import Person from "./module/Person";
import phonebookService from "./services/phonebook";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filter, setFilter] = useState('');
    const filterContacts = (filter === '') ? persons : persons.filter(contact => contact.name.includes(filter));

    useEffect(()=>{
        phonebookService.getAll().then(result=> {
            console.log('check re-render effect');
            setPersons(result)
        })
    },[])

    const addContact = (event) => {
        event.preventDefault();
        const found = persons.find(person => person.name === newName);
        if (found) {
            const confirm=window.confirm(`${found.name} is already added to phonebook, replace the old number with a new one?`);
            if(confirm){
                const updatePerson={...found, number:newNumber}
                phonebookService.update(found.id, updatePerson).then(result=>{
                    setPersons(persons.map(person=>person.id!==found.id?person:result))
                    console.log(persons)
                })
            }
        } else {
            const newPerson = {
                name: newName,
                number: newNumber
            };
            phonebookService.create(newPerson).then(result=>{
                setNewName('');
                setNewNumber('');
                setPersons(persons.concat(newPerson));
            })
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

    const handleDelete=(person)=>{
        const confirm=window.confirm(`Delete ${person.name}`);
        if(confirm){
            phonebookService.deletePhonebook(person.id).then(result=>{
                setPersons(persons.filter(per=>per.id!==person.id))
            })
        }
    }
    return (
        <div>
            <h2>Phonebook</h2>

            <Filter filter={filter} handleEvent={handleFilter}/>

            <h3>add a new</h3>

            <PersonForm formAction={addContact} name={{value: newName, event: handleNameChange}}
                        number={{value: newNumber, event: handlePhoneChange}}/>

            <h3>Numbers</h3>

            {filterContacts.map(person=>
                <Person
                    key={person.id}
                    person={person}
                    deletePerson={()=>handleDelete(person)}
                />
            )}
        </div>
    )
}

export default App