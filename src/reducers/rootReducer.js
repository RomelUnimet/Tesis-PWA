import { combineReducers } from 'redux';

import { authReducer } from '../reducers/authReducer'
import { cardReducer } from './cardReducer';
import { settingsReducer } from './settingsReducer';
import { weatherReducer } from './weatherReducer';
import { tagReducer } from './tagReducer';


export const rootReducer = combineReducers({

    auth: authReducer,
    cards: cardReducer,
    settings: settingsReducer,
    weather: weatherReducer,
    tags: tagReducer,

});