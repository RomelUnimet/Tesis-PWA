
import {authReducer}  from '../../reducers/authReducer'

import { types } from "../../types/types";


const demoAuth = {
    checking: false,
    uid: "6206bbb958922200161ea0c3"
}

describe('Pruebas en auth Reducer', () => { 
    

test('should return initial state', () => { 
    
    const state = authReducer(demoAuth, {type:''})

    expect(state).toEqual(demoAuth)
 })

test('should auth login', () => { 
    
    const newAuth = {
        uid:'123'
    };

    const action = {
        type: types.authLogin,
        payload: newAuth
    };
    
    const state = authReducer( demoAuth, action );
    expect( state ).toEqual( {...demoAuth, uid:newAuth.uid } );
 })

test('should auth check token', () => { 
    
    const testAuth = {
        checking: true
    }
    const newAuth = {
        uid:'123'
    };

    const action = {
        type: types.authChekingToken,
        payload: newAuth
    };
    
    const state = authReducer( testAuth, action );
    expect( state ).toEqual( {...demoAuth, uid:newAuth.uid } );
 })

test('should finish checking', () => { 
    
    const testAuth = {
        checking: true
    }

    const action = {
        type: types.authChekingFinish,
    };
    
    const state = authReducer( testAuth, action );
    expect( state.checking ).toEqual( false );
 })

})