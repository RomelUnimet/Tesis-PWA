import { combineReducers } from 'redux';

import { authReducer } from '../reducers/authReducer'
import { cardReducer } from './cardReducer';
import { settingsReducer } from './settingsReducer';
import { weatherReducer } from './weatherReducer';
import { tagReducer } from './tagReducer';
import { locationReducer } from './locationReducer';
import { scrollMemoReducer } from './scrollMemoReducer';
import { entryReducer } from './entryReducer';
import { navigationReducer } from './navigationReducer';
import { geolocationReducer } from './geolocationReducer';


export const rootReducer = combineReducers({

    auth: authReducer,
    cards: cardReducer,
    userSettings: settingsReducer,
    weather: weatherReducer,
    tags: tagReducer,
    locations: locationReducer,
    scrollMemo: scrollMemoReducer,
    entries: entryReducer,
    navigation: navigationReducer,
    geolocation: geolocationReducer,

});