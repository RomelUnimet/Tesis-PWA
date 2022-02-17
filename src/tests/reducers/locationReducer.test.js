import {locationReducer}  from '../../reducers/locationReducer'

import { types } from "../../types/types";


const demoLoc = [{
    lid:"7962c69d-cf3c-4fa1-8921-2f70b5f6c27c",
    uid:"6206bbb958922200161ea0c3",
    name:"asc",
    description:"",
    latitude:"10.4839037",
    longitude:"-66.770616",
    entries:[]
}]

describe('Pruebas en location Reducer', () => { 

    test('should return initial state', () => { 
    
        const state = locationReducer(demoLoc, {type:''})
    
        expect(state).toEqual(demoLoc)
     })

    test('should store locations', () => { 
    
        const newLoc = [
            {
            lid:"7962c69d-cf3c-4fa1-8921-2f70b5f6c27c",
            uid:"6206bbb958922200161ea0c3",
            name:"asc",
            description:"",
            latitude:"10.4839037",
            longitude:"-66.770616",
            entries:[]
            },
            {
            lid:"7962c69d-cf3c-4fa1-8921-2f70b5f6c27c",
            uid:"6206bbb958922200161ea0c3",
            name:"asc",
            description:"",
            latitude:"10.4839037",
            longitude:"-66.770616",
            entries:[]
            },
        ]
    
        const action = {
            type: types.locationsStore,
            payload: newLoc
        };
        
        const state = locationReducer( demoLoc, action );

        expect( state.locations ).toEqual( newLoc  );
     })

})