import { types } from "../types/types";
import { defineWeather } from "../helpers/defineWeather";
import { storeGeolocation } from "./geolocation";


export const startGetWeather = () => {

    return async (dispatch) =>{

        await navigator.geolocation.getCurrentPosition( async (position) => {

            let lat = position.coords.latitude;
            let lon = position.coords.longitude;

            const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
        
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

            const res = await fetch(apiUrl);
            const {weather, wind} = await res.json()
            
            const weatherLabel = defineWeather(weather[0], wind)

            dispatch( storeGeolocation({lat:lat, lng:lon}) )
            dispatch( finishStoreWeather(weatherLabel) )

        });
      }
}

const finishStoreWeather = ( weatherLabel ) =>{

    return {
        type: types.weatherStore,
        payload: weatherLabel
    }
}

