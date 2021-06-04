import React from 'react'

const Filter = ({filter, handleEvent}) => {
    return (
        <div>
            filter shown with <input value={filter} onChange={handleEvent}/>
        </div>
    )
}

export default Filter