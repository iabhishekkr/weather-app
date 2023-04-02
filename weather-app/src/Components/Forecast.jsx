import React, { useEffect, useState } from 'react'
import './Forecast.css'
import { useParams, useNavigate } from 'react-router-dom'
function Forecast() {
    const navigate = useNavigate();
    const [data, setData] = useState();
    let { city } = useParams();
    const [flag, setFlag] = useState(false);
    useEffect(() => {
        if (!flag)
            fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=1f968feefbb8ab90772ea2c9953d8301`)
                .then((d) => d.json())
                .then((res) => {
                    setData(res.list)
                    setFlag(true)
                })
                .catch((err) => console.log(err))
    }, [city, flag])
    return (
        <div>
            {/* {console.log('data in forecast', data)} */}
            <button className='back-btn' onClick={() => {
                navigate(-1)
            }}>Return</button>
            <div className="weather-container">
                <div className="city-name">
                    Forecast of {city}
                </div>
                {flag && <table>
                    <thead>
                        <tr>
                            <th>Date and Time</th>
                            <th>Temperature</th>
                            <th>Max Temp</th>
                            <th>Min temp</th>
                            <th>Weather Condition</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((e) => {
                            return (
                                <tr key={e.dt_txt}>
                                    <td className="date-time">{e.dt_txt}</td>
                                    <td className='curr-temp'>{Math.round(e.main.temp - 274.15)}</td>
                                    <td className='max-temp'>{Math.round(e.main.temp_max - 274.15)}</td>
                                    <td className='min-temp'>{Math.round(e.main.temp_min - 274.15)}</td>
                                    <td className='weatger-condition'>{e.weather[0].main}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>}

            </div>

        </div>
    )
}

export default Forecast
