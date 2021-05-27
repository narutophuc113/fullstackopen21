import React, {useState} from 'react'

const Header = (props) => {
    return (
        <h1>{props.text}</h1>
    )
}

const Button = (props) => {
    return (
        <button onClick={props.handleClick}>{props.text}</button>
    )
}

const Statistic = (props) => {
    if (props.text === 'positive') {
        return (
            <tr>
                <td>{props.text}</td>
                <td>{props.point} %</td>
            </tr>
        )
    }
    return (
        <tr>
            <td>{props.text}</td>
            <td>{props.point}</td>
        </tr>
    )
}

const Statistics = (props) => {

    const all = props.good + props.bad + props.neutral;
    const average = (props.good - props.bad) / all;
    const positive = props.good * 100 / all;

    if (all < 1) {
        return (
            <p>No feedback given</p>
        )
    }
    return (
        <>
            <table>
                <tbody>
                    <Statistic text={'good'} point={props.good}/>
                    <Statistic text={'neutral'} point={props.neutral}/>
                    <Statistic text={'bad'} point={props.bad}/>
                    <Statistic text={'all'} point={all}/>
                    <Statistic text={'average'} point={average}/>
                    <Statistic text={'positive'} point={positive}/>
                </tbody>
            </table>
        </>
    )
}

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const setGoodValue = (value) => {
        setGood(value)
    }
    const setNeutralValue = (value) => {
        setNeutral(value)
    }
    const setBadValue = (value) => {
        setBad(value)
    }

    return (
        <div>
            <Header text={'give feedback'}/>
            <Button handleClick={() => setGoodValue(good + 1)} text={'good'}/>
            <Button handleClick={() => setNeutralValue(neutral + 1)} text={'neutral'}/>
            <Button handleClick={() => setBadValue(bad + 1)} text={'bad'}/>
            <Header text={'statistics'}/>
            <Statistics good={good} neutral={neutral} bad={bad}/>
        </div>
    )
}
export default App