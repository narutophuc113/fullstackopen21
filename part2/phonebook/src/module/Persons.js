import React from 'react'

const Persons = ({contacts}) => {
    return (
        <div>
            {contacts.map(contact => <p key={contact.name}>{contact.name} {contact.number}</p>)}
        </div>
    )
}

export default Persons