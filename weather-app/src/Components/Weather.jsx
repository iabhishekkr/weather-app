import React, { useEffect, useRef, useState } from 'react'
// import axios from 'axios'
import "./Weather.css"
function Weather() {
    const [data, setData] = useState();
    const [lat, setLat] = useState();
    const [long, setLong] = useState();
    const [temp, setTemp] = useState(0);
    const [maxtemp, setMaxTemp] = useState(0);
    const [mintemp, setMinTemp] = useState(0);
    const [name, setName] = useState("");
    const [condition, setCondition] = useState("");
    const [humidity, setHumidity] = useState(0);
    const [currCity, setCurrCity] = useState("");
    const inpRef = useRef();
    const [fav, setFav] = useState([]);
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function (position) {
            setLat(position.coords.latitude)
            setLong(position.coords.longitude)
            console.log("Latitude is :", lat);
            console.log("Longitude is :", long);
        });
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=1f968feefbb8ab90772ea2c9953d8301`)
            .then((data) => data.json())
            .then((res) => {
                setData(res)
                setName(res.city.name)
                setTemp(Math.round(res.list[0].main.temp - 274.15))
                setMaxTemp(Math.round(res.list[0].main.temp_max - 274.15))
                setMinTemp(Math.round(res.list[0].main.temp_min - 274.15))
                setCondition(res.list[0].weather[0].main)
                setHumidity(res.list[0].main.humidity)
                setCurrCity(res.city.name)
            })
            .catch((err) => console.log(err))
    }, [lat, long])
    useEffect(() => {
        fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${currCity}&appid=1f968feefbb8ab90772ea2c9953d8301`)
            .then((d) => d.json())
            .then((res) => {
                setData(res)
                setName(res.city.name)
                setTemp(Math.round(res.list[0].main.temp - 274.15))
                setMaxTemp(Math.round(res.list[0].main.temp_max - 274.15))
                setMinTemp(Math.round(res.list[0].main.temp_min - 274.15))
                setCondition(res.list[0].weather[0].main)
                setHumidity(res.list[0].main.humidity)
            })
            .catch((err) => console.log(err))
    }, [currCity])

    useEffect(() => {

    }, [fav])
    return (
        <>
            {console.log(data)}
            <div className="nav">
                <div className="search">
                    <input ref={inpRef} type="text" className='searchbar' placeholder='Search for city' />
                    <button onClick={() => {
                        setCurrCity(inpRef.current.value)
                        inpRef.current.value = ""
                    }} className='btn'>Find</button>
                </div>
                <div className="fav">
                    <div className="title">Favourites</div>
                    <ul>
                        {fav.map((e) => <li key={e} onClick={() => {
                            setCurrCity(e);
                        }}>{e}</li>)}
                    </ul>
                </div>

            </div>
            <div className='main-container'>
                {console.log(data)}
                <div className="city">
                    {name}  <span className="favmarker" style={(fav.includes(currCity) ? { color: 'yellow' } : { color: "white" })} onClick={(e) => {
                        console.log(fav, currCity);
                        if (!fav.includes(currCity)) {
                            setFav([...fav, currCity]);
                            e.target.style.color = 'yellow'
                        }
                        else {
                            const newfav = fav.filter((e) => e != currCity)
                            setFav(newfav)
                            e.target.style.color = 'white'
                        }
                    }}>*</span>
                </div>
                <div className="condition">
                    {condition}
                </div>
                <div className="temperature-container">
                    <h2> <span className="temp">{temp}</span> <sup className='deg'>.</sup> C</h2>
                </div>
                <div className="min-max-temp">
                    <span className="max"> <span className='min-max'>MAX</span> {maxtemp}</span> / <span className="min">{mintemp} <span className='min-max'>MIN</span></span>
                </div>
                <div className="air-quality">
                    <div className="air">
                        <span>Humidity  </span><span className='index'>{humidity}</span>
                    </div>
                </div>

                <div className="more">
                    See More <span className="icon">➡️</span>
                </div>
            </div>
        </>
    )
}

export default Weather
