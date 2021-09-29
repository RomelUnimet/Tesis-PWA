import { combineReducers } from 'redux';

import { authReducer } from '../reducers/authReducer'
import { cardReducer } from './cardReducer';
import { settingsReducer } from './settingsReducer';
import { weatherReducer } from './weatherReducer';
import { tagReducer } from './tagReducer';
import { locationReducer } from './locationReducer';
import { pathReducer } from './pathReducer';
import { entryReducer } from './entryReducer';
import { navigationReducer } from './navigationReducer';


export const rootReducer = combineReducers({

    auth: authReducer,
    cards: cardReducer,
    settings: settingsReducer,
    weather: weatherReducer,
    tags: tagReducer,
    locations: locationReducer,
    lastPath: pathReducer,
    entries: entryReducer,
    navigation: navigationReducer,

});