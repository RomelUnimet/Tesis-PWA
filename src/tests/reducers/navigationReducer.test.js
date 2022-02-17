import {navigationReducer}  from '../../reducers/navigationReducer'

import { types } from "../../types/types";

const initialStateNav = {
    
    lastCard : '',
    lastProfile : '',
    navigatingTo : ''
}

describe('Pruebas en navigation Reducer', () => { 
    
    test('should return initial state', () => { 
    
        const state = navigationReducer(initialStateNav, {type:''})
    
        expect(state).toEqual(initialStateNav)
     })

    test('should store last card path', () => { 
    
        const newLastCard = '/details'
    
        const action = {
            type: types.lastCardPathStore,
            payload: newLastCard
        };
        
        const state = navigationReducer( initialStateNav, action );

        expect( state ).toEqual( {...initialStateNav, lastCardPath: newLastCard} );
    })

    test('should store last profile path', () => { 
    
        const newLastprofile = '/details'
    
        const action = {
            type: types.lastProfilePathStore,
            payload: newLastprofile
        };
        
        const state = navigationReducer( initialStateNav, action );

        expect( state ).toEqual( {...initialStateNav, lastProfilePath: newLastprofile} );
    })
    test('should store last card path', () => { 
    
        const newLastNavto = 'card'
    
        const action = {
            type: types.navigatingToStore,
            payload: newLastNavto
        };
        
        const state = navigationReducer( initialStateNav, action );

        expect( state ).toEqual( {...initialStateNav, navigatingTo: newLastNavto} );
    })
})