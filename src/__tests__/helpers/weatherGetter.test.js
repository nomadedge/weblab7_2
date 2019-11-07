fetch = require('jest-fetch-mock');

import { getWeather } from '../../helpers/weatherGetter';

beforeEach(() => {
    fetch.resetMocks();
});

describe('Get weather function', () => {
    test('Should return correct weather object for correct cityName with "isOk" equal to true',
        async () => {
            fetch.mockResponseOnce(JSON.stringify(
                {
                    "coord": {
                        "lon": -97.42,
                        "lat": 35.59
                    },
                    "weather": [
                        {
                            "id": 701,
                            "main": "Mist",
                            "description": "mist",
                            "icon": "50n"
                        }
                    ],
                    "base": "stations",
                    "main": {
                        "temp": 287.06,
                        "pressure": 1022,
                        "humidity": 100,
                        "temp_min": 286.15,
                        "temp_max": 288.15
                    },
                    "visibility": 14484,
                    "wind": {
                        "speed": 3.6,
                        "deg": 210
                    },
                    "clouds": {
                        "all": 90
                    },
                    "dt": 1573039688,
                    "sys": {
                        "type": 1,
                        "id": 6021,
                        "country": "US",
                        "sunrise": 1573044975,
                        "sunset": 1573083021
                    },
                    "timezone": -21600,
                    "id": 4544356,
                    "name": "Witcher",
                    "cod": 200
                }
            ));

            const expectedResult = {
                isOk: true,
                weather: {
                    iconUrl: "http://openweathermap.org/img/w/50n.png",
                    description: "mist",
                    temperature: "14",
                    pressure: 1022,
                    humidity: 100,
                    windSpeed: 3.6
                }
            };

            expect(await getWeather('Correct city name')).toEqual(expectedResult);
        });

    test('Should return correct error object for incorrect cityName with "isOk" equal to false',
        async () => {
            fetch.mockResponseOnce(
                JSON.stringify(
                    {
                        "cod": "404",
                        "message": "city not found"
                    }
                ),
                { status: 404 });

            const expectedResult = {
                isOk: false,
                error: {
                    "status": "404",
                    "message": "city not found"
                }
            };

            expect(await getWeather('Incorrect city name')).toEqual(expectedResult);
        });
});