import { favoriteCityError } from '../helpers/constants';
import { getWeatherByName } from '../helpers/weatherGetter';

export function addCity(cityName) {
    return async function (dispatch) {
        if (!cityName) {
            dispatch({ type: 'SHOW_HIDE_MODAL', payload: 'Please enter the city.' });
            return;
        }
        dispatch({ type: 'ADD_CITY' });
        const weatherObj = await getWeatherByName(cityName);
        if (weatherObj.isOk) {
            dispatch({ type: 'ADD_CITY_SUCCESS', payload: weatherObj });

        } else {
            dispatch({ type: 'ADD_CITY_ERROR' });
            dispatch({ type: 'SHOW_HIDE_MODAL', payload: favoriteCityError });
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
        const weatherObj = await getWeatherByName(cityName);
        if (weatherObj.isOk) {
            dispatch({ type: 'FETCH_CITY_WEATHER_SUCCESS', payload: weatherObj });

        } else {
            const payload = {
                city: cityName,
                error: 'Loading error.'
            };
            dispatch({ type: 'FETCH_CITY_WEATHER_ERROR', payload: payload });
        }
    }
}

export function handleModal() {
    return async function (dispatch) {
        dispatch({ type: 'SHOW_HIDE_MODAL' });
    }
}