import React, { useState } from 'react'
import '../../scss/profile/profile.scss'
import {WeatherFilter} from '../compHelper/WeatherFilter'
import {initWeathers} from '../../helpers/mostUsedWeathers'

export const ProfileAllWeathers = ({allWeathers}) => {

    const [mostUsedWeathers] = useState(initWeathers(allWeathers))

    return (
        <div className="profile-all-weather-container">
            <div className="profile-all-weather-topbar">
                <h3>Weather</h3>
            </div>
            <div className="profile-all-weather-count">
                {
                    mostUsedWeathers.map((weather, index)=>(

                        <div key={index} className="profile-all-weather">
                            <p> {weather?.count} </p>
                            <div className="weather-count-bar"
                                 style={mostUsedWeathers[0]?.count===weather?.count? {height:'60%'} : {height: `${(weather?.count/mostUsedWeathers[0]?.count)*60}%` } }
                            />  
                            <WeatherFilter selectedWeather={weather?.name} style={{height: '1.8rem',fontSize: '1.8rem', fill: '#404040',}} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

