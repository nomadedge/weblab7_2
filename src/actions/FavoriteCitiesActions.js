import { getWeather } from '../helpers/weatherGetter';

export function addCity(cityName, currentState) {
    return async function (dispatch) {
        if (currentState.findIndex(city => city.name === cityName) === -1) {
            dispatch({ type: 'ADD_CITY', payload: cityName });
        }
        else {
            alert('This city is already added!');
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
                error: 'Weather for this city is not avaliable :('
            };
            dispatch({ type: 'FETCH_CITY_WEATHER_ERROR', payload: payload });
            return;
        }
    }
}