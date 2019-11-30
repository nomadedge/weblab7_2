import { favoriteCityError } from '../helpers/constants';
import { getWeatherByName } from '../helpers/weatherGetter';

export function addCity(cityName) {
    return async function (dispatch) {
        if (!cityName) {
            alert('Please enter the city.');
            return;
        }
        dispatch({ type: 'ADD_CITY' });
        const weatherObj = await getWeatherByName(cityName);
        if (weatherObj.isOk) {
            dispatch({ type: 'ADD_CITY_SUCCESS', payload: weatherObj });

        } else {
            alert(favoriteCityError);
            dispatch({ type: 'ADD_CITY_ERROR' });
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
                error: favoriteCityError
            };
            dispatch({ type: 'FETCH_CITY_WEATHER_ERROR', payload: payload });
        }
    }
}