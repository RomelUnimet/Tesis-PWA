import {cardReducer}  from '../../reducers/cardReducer'

import { types } from "../../types/types";


const demoCards = {
    cards: [{
        cid:"dcb93cd7-082d-4c20-a8f1-a39ae1295719",
        uid:"6206bbb958922200161ea0c3",
        month:0,
        year:2020,
        photo:"",
        color:"#D2D2D2",
        entries:[]
    },
    {
        cid:"dcb93cd7-082d-4c20-a8f1-a39ae1295718",
        uid:"6206bbb958922200161ea0c3",
        month:1,
        year:2021,
        photo:"sdgsdfgsdfg",
        color:"#D2D2D2",
        entries:[]
    }
    ]
}

describe('Pruebas en card Reducer', () => { 
    
    test('should return initial state', () => { 
    
        const state = cardReducer(demoCards, {type:''})
    
        expect(state).toEqual(demoCards)
     })

    test('should store cards', () => { 
    
        const newCards = [{
                cid:"dcb93cd7-082d-4c20-a8f1-a39ae1295719",
                uid:"6206bbb958922200161ea0c3",
                month:0,
                year:2020,
                photo:"",
                color:"#D2D2D2",
                entries:[]
            },
            {
                cid:"dcb93cd7-082d-4c20-a8f1-a39ae1295718",
                uid:"6206bbb958922200161ea0c3",
                month:1,
                year:2021,
                photo:"sdgsdfgsdfg",
                color:"#D2D2D2",
                entries:[]
            },
            {
                cid:"dcb93cd7-082d-4c20-a8f1-a39ae1295718",
                uid:"6206bbb958922200161ea0c3",
                month:1,
                year:2021,
                photo:"sdgsdfgsdfg",
                color:"#D2D2D2",
                entries:[]
            }
        ]
        
    
        const action = {
            type: types.cardStore,
            payload: newCards
        };
        
        const state = cardReducer( demoCards, action );

        expect( state.cards ).toEqual( newCards  );
     })
    

})