import { localCityError } from '../helpers/constants';
import { getWeatherByCoord, getWeatherByName } from '../helpers/weatherGetter';

let defaultCity = 'Witcher';

export function fetchLocalWeather() {
    return async function (dispatch) {
        dispatch({ type: 'FETCH_LOCAL_WEATHER' });

        if (navigator.geolocation) {
            await navigator.geolocation.getCurrentPosition(
                async position => {
                    const weatherObj = await getWeatherByCoord(position.coords.latitude, position.coords.longitude);
                    if (weatherObj.isOk) {
                        dispatch({ type: 'FETCH_LOCAL_WEATHER_SUCCESS', payload: weatherObj });
                        return;
                    } else {
                        dispatch({ type: 'FETCH_LOCAL_WEATHER_ERROR', payload: localCityError });
                        return;
                    }
                },
                async error => {
                    const weatherObj = await getWeatherByName(defaultCity);
                    if (weatherObj.isOk) {
                        dispatch({ type: 'FETCH_LOCAL_WEATHER_SUCCESS', payload: weatherObj });
                        return;
                    } else {
                        dispatch({ type: 'FETCH_LOCAL_WEATHER_ERROR', payload: localCityError });
                        return;
                    }
                });
        } else {
            const weatherObj = await getWeatherByName(defaultCity);
            if (weatherObj.isOk) {
                dispatch({ type: 'FETCH_LOCAL_WEATHER_SUCCESS', payload: weatherObj });
                return;
            } else {
                dispatch({ type: 'FETCH_LOCAL_WEATHER_ERROR', payload: localCityError });
                return;
            }
        }
    }
}