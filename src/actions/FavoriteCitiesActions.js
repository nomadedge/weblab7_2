import { getWeather } from '../helpers/weatherGetter';
// const getWeather = require('../helpers/weatherGetter');

export function addCity(cityName, currentState) {
    return async function (dispatch) {
        if (!cityName) {
            alert('Please enter the city :)');
            return;
        }
        cityName = cityName.trim();
        const cityNameFormatted = cityName[0].toUpperCase() + cityName.slice(1).toLowerCase();
        if (currentState.findIndex(city => city.name === cityNameFormatted) === -1) {
            dispatch({ type: 'ADD_CITY', payload: cityNameFormatted });
        }
        else {
            alert('This city is already added :/');
        }
    }
}

export function deleteCity(cityName) {
    return async function (dispatch) {
        dispatch({ type: 'DELETE_CITY', payload: cityName });
    }
}

export function fetchCityWeather(cityName) {
    return async function (dispatch) {
        dispatch({ type: 'FETCH_CITY_WEATHER', payload: cityName });
        const weatherResult = await getWeather(cityName);

        if (weatherResult.isOk) {
            const payload = {
                city: cityName,
                weather: weatherResult.weather
            };
            dispatch({ type: 'FETCH_CITY_WEATHER_SUCCESS', payload: payload });
            return;
        }
        else {
            const payload = {
                city: cityName,
                error: 'Weather for this city is not available :('
            };
            dispatch({ type: 'FETCH_CITY_WEATHER_ERROR', payload: payload });
            return;
        }
    }
}