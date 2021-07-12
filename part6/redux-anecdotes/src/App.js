import React, {useEffect} from 'react'
import ConnectedAnecdoteForm from "./components/AnecdoteForm";
import ConnectedAnecdoteList from "./components/AnecdoteList";
import ConnectedNotification from "./components/Notification";
import ConnectedFilter from "./components/Filter";
import {useDispatch} from "react-redux";
import {initialAnecdote} from "./reducers/anecdoteReducer"

const App = () => {
    const disPatch = useDispatch()
    useEffect(() => {
        disPatch(initialAnecdote())
    }, [disPatch])

    return (
        <div>
            <h2>Anecdotes</h2>
            <ConnectedNotification/>
            <ConnectedFilter/>
            <ConnectedAnecdoteList/>
            <ConnectedAnecdoteForm/>
        </div>
    )
}

export default App