import { defaultError } from '../helpers/constants';
import { getWeather } from '../helpers/weatherGetter';

const defaultCity = 'Witcher';
const googleMapsKey = 'AIzaSyADtVQrQmnam1m9XM-mblqN2wamkglWhlY';

export function fetchLocalWeather() {
    return async function (dispatch) {
        let cityName = '';

        dispatch({ type: 'FETCH_LOCAL_WEATHER' });

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async position => {
                    const googleMapsUrl =
                        'https://maps.googleapis.com/maps/api/geocode/json?latlng=' +
                        position.coords.latitude + ',' + position.coords.longitude +
                        '&key=' +
                        googleMapsKey;

                    const locationData = await fetch(googleMapsUrl);
                    const locationJson = await locationData.json();

                    if (locationData.ok) {
                        locationJson.results.forEach(element => {
                            if (
                                JSON.stringify(element.types) ===
                                JSON.stringify(['locality', 'political'])
                            ) {
                                cityName = element.address_components[0].long_name;
                            }
                        });
                        if (cityName === '') {
                            dispatch({ type: 'FETCH_LOCAL_WEATHER_ERROR', payload: defaultError });
                            return;
                        }
                    } else {
                        dispatch({ type: 'FETCH_LOCAL_WEATHER_ERROR', payload: defaultError });
                        return;
                    }

                    handleOpenWeather(cityName, dispatch);
                },
                async error => {
                    cityName = defaultCity;
                    handleOpenWeather(cityName, dispatch);
                });
        } else {
            cityName = defaultCity;
            handleOpenWeather(cityName, dispatch);
        }
    }
}

async function handleOpenWeather(cityName, dispatch) {
    const weatherResult = await getWeather(cityName);

    if (weatherResult.isOk) {
        const payload = {
            city: cityName,
            weather: weatherResult.weather
        };
        dispatch({ type: 'FETCH_LOCAL_WEATHER_SUCCESS', payload: payload });
        return;
    }
    else {
        dispatch({ type: 'FETCH_LOCAL_WEATHER_ERROR', payload: defaultError });
        return;
    }
}