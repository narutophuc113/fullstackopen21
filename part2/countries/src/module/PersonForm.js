import React from 'react'

const PersonForm = ({formAction, name, number}) => {
    return (
        <>
            <form onSubmit={formAction}>
                <div>
                    name: <input value={name.value} onChange={name.event}/>
                </div>
                <div>
                    number: <input value={number.value} onChange={number.event}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </>
    )
}

export default PersonForm