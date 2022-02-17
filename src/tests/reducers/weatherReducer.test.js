import {weatherReducer}  from '../../reducers/weatherReducer'

import { types } from "../../types/types";


const demoWeather = {
    weather:'sunny'
}

describe('Pruebas en weather Reducer', () => { 
    test('should return initial state', () => { 
    
        const state = weatherReducer(demoWeather, {type:''})
    
        expect(state).toEqual(demoWeather)
     })

     test('should store weather', () => { 
    
        const newWeather = {weather:'cloudy'}
    
        const action = {
            type: types.weatherStore,
            payload: newWeather
        };
        
        const state = weatherReducer( demoWeather, action );

        expect( state.weather ).toEqual( newWeather  );
     })
})