import React from "react";
import {connect} from "react-redux";
import {voteAnecdote} from "../reducers/anecdoteReducer";
import {setNotification} from "../reducers/notificationReducer";

const AnecdoteList = (props) => {
    const vote = (id, anecdote) => {
        console.log('vote', id)
        props.voteAnecdote(id, anecdote)
        props.setNotification(`you voted ${anecdote.content}`,5)
    }

    return (
        <div>
            {props.anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id, anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

const mapStateToProps=(state)=>{
    return{
        anecdotes:state.anecdote.filter(anec => anec.content.includes(state.filter))
    }
}

const mapDispatchToProps= (dispatch)=>{
    return{
        voteAnecdote: (id, anecdote)=>{
            dispatch(voteAnecdote(id, anecdote))
        },
        setNotification:(message,timeout)=>{
            dispatch(setNotification(message,timeout))
        }
    }
}

const ConnectedAnecdoteList=connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default ConnectedAnecdoteList