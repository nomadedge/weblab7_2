import axios from 'axios';

const openWeatherKey = 'd5bb735f9e1ce1a846ab736fc9d95dc6';

const getWeatherByUrl = async url => {
    let city = {};
    try {
        city = await axios.get(url);
    } catch (error) {
        const out = {
            isOk: false,
            error: city.status
        };
        return out;
    }

    const weather = {
        iconUrl: `http://openweathermap.org/img/w/${city.data.weather[0].icon}.png`,
        description: city.data.weather[0].description,
        temperature: (city.data.main.temp - 273.15).toFixed(0),
        pressure: city.data.main.pressure,
        humidity: city.data.main.humidity,
        windSpeed: city.data.wind.speed
    };

    const out = {
        isOk: true,
        name: city.data.name,
        weather: weather
    };
    return out;
};

export const getWeatherByName = cityName => {
    return new Promise(async result => {
        const openWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${openWeatherKey}`;
        const out = await getWeatherByUrl(openWeatherUrl);
        result(out);
    });
};

export const getWeatherByCoord = (lat, lon) => {
    return new Promise(async result => {
        const openWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${openWeatherKey}`;
        const out = await getWeatherByUrl(openWeatherUrl);
        result(out);
    });
};