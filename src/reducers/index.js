import { combineReducers } from 'redux';

import localWeather from './LocalWeatherReducer';
import favoriteCities from './FavoriteCitiesReducer';

export default combineReducers({
    localWeather,
    favoriteCities
});