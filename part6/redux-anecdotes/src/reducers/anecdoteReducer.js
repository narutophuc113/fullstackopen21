import anecdotesService from "../services/anecdotes"
import anecdotes from "../services/anecdotes";


const anecdotesAtStart = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
    return {
        content: anecdote,
        id: getId(),
        votes: 0
    }
}

const initialState = anecdotesAtStart.map(asObject)

export const initialAnecdote = () => {
    return async (disPatch) => {
        const anecdotes = await anecdotesService.getAll()
        disPatch({
            type: 'INIT_ANECDOTES',
            data: anecdotes
        })
    }
}

export const createAnecdote = (content) => {
    return async (dispatch) => {
        const data = await anecdotesService.createNew(content)
        dispatch({
            type: 'NEW_ANECDOTE',
            data
        })
    }
}

export const voteAnecdote = (id, anecdote) => {
    return async dispatch => {
        anecdote.votes++
        const updatedAnecdote=await anecdotesService.update(id,anecdote)
        dispatch({
            type: 'VOTE',
            data: updatedAnecdote
        })
    }
}

const sortAnecdotes = (anecdotes) => {
    anecdotes.sort((a, b) => b.votes - a.votes)
}

const anecdoteReducer = (state = [], action) => {
    switch (action.type) {
        case 'VOTE': {
            let result = state.map(anecdote => anecdote.id === action.data.id ?
                (action.data) :
                anecdote)
            sortAnecdotes(result)
            return result
        }
        case 'NEW_ANECDOTE': {
            return [...state, action.data]
        }
        case 'INIT_ANECDOTES': {
            sortAnecdotes(action.data)
            return action.data
        }
        default:
            return state
    }
}

export default anecdoteReducer