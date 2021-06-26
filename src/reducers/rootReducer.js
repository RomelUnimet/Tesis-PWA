import { combineReducers } from 'redux';

import { authReducer } from '../reducers/authReducer'
import { cardReducer } from './cardReducer';
import { settingsReducer } from './settingsReducer';


export const rootReducer = combineReducers({

    auth: authReducer,
    cards: cardReducer,
    settings: settingsReducer,

});