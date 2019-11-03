const openWeatherKey = 'd5bb735f9e1ce1a846ab736fc9d95dc6';

export function getWeather(cityName) {
    return new Promise(async result => {
        const openWeatherUrl =
            'https://api.openweathermap.org/data/2.5/weather?q=' +
            cityName +
            '&appid=' +
            openWeatherKey;

        const weatherData = await fetch(openWeatherUrl);
        const weatherJson = await weatherData.json();

        if (weatherData.ok) {
            const weather = {
                iconUrl:
                    'http://openweathermap.org/img/w/' +
                    weatherJson.weather[0].icon +
                    '.png',
                description: weatherJson.weather[0].description,
                temperature: (weatherJson.main.temp - 273.15).toFixed(0),
                pressure: weatherJson.main.pressure,
                humidity: weatherJson.main.humidity,
                windSpeed: weatherJson.wind.speed
            };
            const out = {
                isOk: true,
                weather: weather
            };
            result(out);
            return;
        } else {
            const out = {
                isOk: false,
                status: weatherData.status
            };
            result(out);
            return;
        };
    });
}