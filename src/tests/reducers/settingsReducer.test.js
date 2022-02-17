import {settingsReducer}  from '../../reducers/settingsReducer'

import { types } from "../../types/types";


const demoSettings = [
    {
    order: ["Photos","Tag","Location","Weather"],
    _id:"6206bbb958922200161ea0c4",
    sid:"66844bdf-d03b-4a3a-b55d-32c852afe1dc",
    uid:"6206bbb958922200161ea0c3",
    name:"",
    description:"",
    photo:"",
    active:false,
    time:"2022-02-11T19:40:41.574Z",
    token:"dPCc0Ie2Tu9jO3wUqIMTGv:APA91bG8E_4iq7Yw5HYJtVFVFP2dG-GVE-6vQqGrMf2E1jIAf5bCXay-fspAiOyt-0zkM3EYU6qlTEHc4wbQCGVNtt_jcz2SzizMAeTrliNGmYSiqnn4jXl9t3eqj9rxOBi3YwTA0MLr",
    auth:false,
    __v:0
    }
]

describe('Pruebas en tag Reducer', () => { 
    test('should return initial state', () => { 
    
        const state = settingsReducer(demoSettings, {type:''})
    
        expect(state).toEqual(demoSettings)
     })

    test('should store settings', () => { 
    
        const newSet = [
            {
                order: ["Photos","Tag","Location","Weather"],
                _id:"6206bbb958922200161ea0c4",
                sid:"66844bdf-d03b-4a3a-b55d-32c852afe1dc",
                uid:"6206bbb958922200161ea0c3",
                name:"asdsadsad",
                description:"",
                photo:"",
                active:false,
                time:"2022-02-11T19:40:41.574Z",
                token:"dPCc0Ie2Tu9jO3wUqIMTGv:APA91bG8E_4iq7Yw5HYJtVFVFP2dG-GVE-6vQqGrMf2E1jIAf5bCXay-fspAiOyt-0zkM3EYU6qlTEHc4wbQCGVNtt_jcz2SzizMAeTrliNGmYSiqnn4jXl9t3eqj9rxOBi3YwTA0MLr",
                auth:false,
                __v:0
            }
        ]
    
        const action = {
            type: types.settStore,
            payload: newSet
        };
        
        const state = settingsReducer( demoSettings, action );

        expect( state.userSettings ).toEqual( newSet  );
     })

})