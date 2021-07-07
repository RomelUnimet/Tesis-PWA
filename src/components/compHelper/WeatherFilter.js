import React from 'react'
import { WiDaySunny, WiDayCloudy, WiCloud, WiRain, WiSnow,  WiThunderstorm, WiCloudyGusts, WiCloudyWindy, WiDust, WiTornado, WiSnowflakeCold } from "react-icons/wi";
import { useSelector } from 'react-redux';


export const WeatherFilter = ({selectedWeather, style}) => {

    const {weather} = useSelector(state => state.weather)

    switch (selectedWeather) {

        case 'sunny':
            return(<WiDaySunny style={style} />)
        case 'cloudy':
            return(<WiDayCloudy style={style}/>)
        case 'cloud':
            return(<WiCloud style={style}/>)
        case 'rain':
            return(<WiRain style={style}/>)
        case 'haze':
            return(<WiSnow style={style}/>)
        case 'thunder':
            return(<WiThunderstorm style={style}/>)
        case 'cloudy-gust':
            return(<WiCloudyGusts style={style}/>)
        case 'cloudy-windy':
            return(<WiCloudyWindy style={style}/>)
        case 'dusty':
            return(<WiDust style={style}/>)
        case 'tornado':
            return(<WiTornado style={{ height:'1.8rem', width:'2.4rem', fill:'#757575', margin:'0px', marginLeft: '2px', marginRight: '2px'}}/>)
        case 'snow':
            return(<WiSnowflakeCold style={style}/>)
        default:
            
            const newStyle= {...style, fill:'#B6B6B6'}

            switch (weather) {
                case 'sunny':
                    return(<WiDaySunny style={newStyle} />)
                case 'cloudy':
                    return(<WiDayCloudy style={newStyle}/>)
                case 'cloud':
                    return(<WiCloud style={newStyle}/>)
                case 'rain':
                    return(<WiRain style={newStyle}/>)
                case 'haze':
                    return(<WiSnow style={newStyle}/>)
                case 'thunder':
                    return(<WiThunderstorm style={newStyle}/>)
                case 'cloudy-gust':
                    return(<WiCloudyGusts style={newStyle}/>)
                case 'cloudy-windy':
                    return(<WiCloudyWindy style={newStyle}/>)
                case 'dusty':
                    return(<WiDust style={newStyle}/>)
                case 'tornado':
                    return(<WiTornado style={newStyle}/>)
                case 'snow':
                    return(<WiSnowflakeCold style={newStyle}/>)
                default:
                    return(<WiDayCloudy style={newStyle}/>) 
            }
    }
}
