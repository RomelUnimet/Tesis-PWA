import {tagReducer}  from '../../reducers/tagReducer'

import { types } from "../../types/types";


const demoTag = [{
    tid:"6fd6d50b-0529-4c42-8550-162e49418766",
    uid:"6206bbb958922200161ea0c3",
    name:"h",
    entries:[],
}]

describe('Pruebas en tag Reducer', () => { 
    test('should return initial state', () => { 
    
        const state = tagReducer(demoTag, {type:''})
    
        expect(state).toEqual(demoTag)
     })

    test('should store tags', () => { 
    
        const newtag = [
            {
                tid:"6fd6d50b-0529-4c42-8550-162e49418766",
                uid:"6206bbb958922200161ea0c3",
                name:"h",
                entries:[],
            },
            {
                tid:"6fd6d50b-0529-4c42-8550-162e49418766",
                uid:"6206bbb958922200161ea0c3",
                name:"h",
                entries:[],
            }
        ]
    
        const action = {
            type: types.tagsStore,
            payload: newtag
        };
        
        const state = tagReducer( demoTag, action );

        expect( state.tags ).toEqual( newtag  );
     })

})