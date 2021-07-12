import React from "react";
import {setFilter} from "../reducers/filterReducer";
import {connect} from "react-redux";

const Filter=(props)=>{
    const handleOnChange=(event)=>{
        console.log('filter 1', event.target.value)
        props.setFilter(event.target.value)
    }

    const style={
        marginBottom:10
    }

    return(
        <div style={style}>
            filter <input type="text" onChange={handleOnChange}/>
        </div>
    )
}

const mapDispatchToProps=(dispatch)=>{
    return{
        setFilter:value=>{
            dispatch(setFilter(value))
        }
    }
}
const ConnectedFilter=connect(null, mapDispatchToProps)(Filter)
export default ConnectedFilter