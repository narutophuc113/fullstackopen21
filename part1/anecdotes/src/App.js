import React, {useState} from 'react'

const Title = (props) => {
    return (
        <h1>{props.text}</h1>
    )
}

const Anecdotes = (props) => {
    const anecdotes=props.anecdotes;
    const vote=props.vote;
    const selected=props.selected;
    return (
        <>
            <p>{anecdotes[selected]}</p>
            <p>has {vote[selected]} votes</p>
        </>
    )
}

const Mostvote=(props)=>{
    return(
        <>
            <p>{props.text}</p>
            <p>has {props.vote} votes</p>
        </>
    )
}

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
    ]

    const [vote, setVote] = useState([0,1,2,3,4,5])
    // const [vote, setVote] = useState(new Array(6 + 1).join('0').split('').map(parseFloat))
    const [selected, setSelected] = useState(0)

    let mostVote=0;
    const randomGenerate = () => {
        let random = Math.floor(Math.random() * 6);
        while (random === selected) {
            random = Math.floor(Math.random() * 6);
        }
        setSelected(random)
    }

    const voteHandle = () => {
        const copy = [...vote]
        copy[selected] += 1
        setVote(copy)
    }

    const maxIndex = (arr) => {
        if (arr.length === 0) {
        return -1;
        }
        let max = arr[0];
        let maxIndex = 0;
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] > max) {
                maxIndex = i;
                max = arr[i];
            }
        }

        return maxIndex;
    }
    mostVote=maxIndex(vote)

    return (
        <div>
            <Title text={'Anecdote of the day'}/>
            <Anecdotes anecdotes={anecdotes} vote={vote} selected={selected}/>
            <button onClick={voteHandle}>vote</button>
            <button onClick={randomGenerate}>next anecdote</button>
            <Title text={'Anecdote with most votes'}/>
            <Mostvote text={anecdotes[mostVote]} vote={vote[mostVote]} mostvote={mostVote}/>
        </div>
    )
}

export default App