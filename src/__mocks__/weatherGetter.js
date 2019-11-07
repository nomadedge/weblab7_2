export function getWeather(cityName) {
    console.log('MOCK');
    if (cityName === 'correctCityName') {
        return Promise.resolve({
            isOk: true,
            weather: {
                iconUrl: "http://openweathermap.org/img/w/50n.png",
                description: "mist",
                temperature: "14",
                pressure: 1022,
                humidity: 100,
                windSpeed: 3.6
            }
        });
    } else {
        return Promise.resolve({
            isOk: false,
            error: {
                status: "404",
                message: "city not found"
            }
        });
    }
};