import {entryReducer}  from '../../reducers/entryReducer'

import { types } from "../../types/types";


const demoEntry = {
    entries: [{
        eid:"c0cbe07b-fa8a-4f92-a9c7-018928df0921",
        cid:"45452f60-9f11-453a-b6e1-23fd8decb85c",
        uid:"6206bbb958922200161ea0c3",
        photos:[],
        date:"2022-02-16T16:44:27.126Z",
        title:"",
        text:"",
        weather:"none",
        tags:[],
        location:"",
        trash:false,
    }],
}

describe('Pruebas en entry Reducer', () => { 
    
    test('should return initial state', () => { 
    
        const state = entryReducer(demoEntry, {type:''})
    
        expect(state).toEqual(demoEntry)
     })

    test('should store entries', () => { 
    
        const newEntries = [
        {
            eid:"c0cbe07b-fa8a-4f92-a9c7-018928df0921",
            cid:"45452f60-9f11-453a-b6e1-23fd8decb85c",
            uid:"6206bbb958922200161ea0c3",
            photos:[],
            date:"2022-02-16T16:44:27.126Z",
            title:"",
            text:"",
            weather:"none",
            tags:[],
            location:"",
            trash:false,
        },
        {
            eid:"c0cbe07b-fa8a-4f92-a9c7-018928df0921",
            cid:"45452f60-9f11-453a-b6e1-23fd8decb85c",
            uid:"6206bbb958922200161ea0c3",
            photos:[],
            date:"2022-02-16T16:44:27.126Z",
            title:"",
            text:"",
            weather:"none",
            tags:[],
            location:"",
            trash:false,
        },
    ]
        
    
        const action = {
            type: types.entriesStore,
            payload: newEntries
        };
        
        const state = entryReducer( demoEntry, action );

        expect( state.entries ).toEqual( newEntries );
     })
})