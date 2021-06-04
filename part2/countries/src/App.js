import React, {useState, useEffect} from 'react'
import axios from 'axios'

const api_key=process.env.REACT_APP_API_KEY

const Country=({country})=>{
    return(
        <div>
            <h2>{country.name}</h2>
            <div>
                <p>capital {country.capital}</p>
                <p>population {country.population}</p>
                <h3>Spoken languages</h3>
                {country.languages.map(lang => <li key={lang.iso639_1}>{lang.name}</li>)}
                <img src={country.flag} alt={country.name} width={"100"}/>
            </div>
        </div>
    )
}

const Countries = ({country}) => {
    const [show, setShow] = useState(false)
    let valueButton=show?"hide":"show"

    const showClick = () => {
        setShow(!show);
    }

    return (
        <div>
            <div key={country.name}>{country.name} <input type="button" value={valueButton} onClick={showClick}/></div>
            {show ? (<Country country={country}/>): null}
        </div>
    )
}

const OneCountry=({country})=>{
    const [weather, setWeather]=useState({});
    useEffect(()=>{
        axios
            .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
            .then(response=>{
                console.log(response.data);
                setWeather(response.data.current);
            })
    },[])

    return (
        <div>
            <Country country={country}/>
            <h3>Weather in {country.name}</h3>
            <div><strong>temperature:</strong> {weather.temperature} Celcius</div>
            <img src={weather.weather_icons} alt="weather_icons"/>
            <div><strong>wind:</strong>{weather.wind_speed}mph direction {weather.wind_dir}</div>
        </div>
    )
}

const Result = ({listCountries}) => {
    const len = listCountries.length
    let result = ''
    if (len > 10) {
        result = <div>Too many matches, specify another filter</div>
    } else if (len > 1) {
        result = <div>{listCountries.map((country) => {
            return (
                <Countries country={country} key={country.name}/>
            )
        })}</div>
    } else if (len === 1) {
        result = <div>{listCountries.map((country) => {
            return (
                <OneCountry country={country} key={country.name}/>
            )
        })}</div>
    }
    return (
        result
    )
}

const App = () => {
    const [countries, setCountries] = useState([]);
    const [filter, setFilter] = useState('');
    const filterCountries = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()));

    useEffect(() => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                setCountries(response.data);
            })
    }, [])

    const handleFilter = (event) => {
        setFilter(event.target.value);
    };

    return (
        <div>
            <div>
                find countries <input value={filter} onChange={handleFilter}/>
            </div>
            <Result listCountries={filterCountries}/>
        </div>
    )
}

export default App