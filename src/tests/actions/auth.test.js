import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import {startChecking} from '../../actions/auth'
import {startGetWeather} from '../../actions/extra'
import Localbase from 'localbase';
//import 'fake-indexeddb/auto'

 

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const store = mockStore({
    auth : {
        checking: true,
        uid: "6206bbb958922200161ea0c3"
    },
    weather: {

        weather:"cloud"
    } 
})

describe('first', () => { 
    test('should first', async() => { 

        
     })
 })