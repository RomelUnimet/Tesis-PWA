import {geolocationReducer}  from '../../reducers/geolocationReducer'

import { types } from "../../types/types";


const demoGeolocation = {
    geolocation: {lat:0, lng:0},    
}

describe('Pruebas en geolocation Reducer', () => { 
    
    test('should return initial state', () => { 
    
        const state = geolocationReducer(demoGeolocation, {type:''})
    
        expect(state).toEqual(demoGeolocation)
     })

    test('should store geolocation', () => { 
    
        const newGeo = {
            lat:1,
            lng:1
        }
    
        const action = {
            type: types.geolocationStore,
            payload: newGeo
        };
        
        const state = geolocationReducer( demoGeolocation, action );

        expect( state.geolocation ).toEqual( newGeo  );
     })
})