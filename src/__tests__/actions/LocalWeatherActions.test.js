jest.mock('../../helpers/weatherGetter.js');

fetch = require('jest-fetch-mock');

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { defaultError } from '../../helpers/constants';
import * as actions from '../../actions/LocalWeatherActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

beforeEach(() => {
    fetch.resetMocks();
});

const initialState = {
    isFetching: false,
    city: null,
    weather: {},
    error: null
};

describe('Fetch local weather', () => {
    test('Should dispatch default error if google api is not available', () => {
        const mockGeolocation = {
            getCurrentPosition: jest.fn()
                .mockImplementation((success) => Promise.resolve(success({
                    coords: {
                        latitude: 10,
                        longitude: 10
                    }
                })))
        };
        navigator.geolocation = mockGeolocation;

        fetch.mockResponseOnce(JSON.stringify({}), { status: 400 });

        const expectedActions = [
            { type: 'FETCH_LOCAL_WEATHER' },
            { type: 'FETCH_LOCAL_WEATHER_ERROR', payload: defaultError }
        ];

        const store = mockStore(initialState);

        return store.dispatch(actions.fetchLocalWeather()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    test('Should dispatch default error if google api did not find city name', () => {
        const mockGeolocation = {
            getCurrentPosition: jest.fn()
                .mockImplementation((success) => Promise.resolve(success({
                    coords: {
                        latitude: 10,
                        longitude: 10
                    }
                })))
        };
        navigator.geolocation = mockGeolocation;

        fetch.mockResponseOnce(JSON.stringify({
            "results": [
                {
                    "address_components": [
                        {
                            "long_name": "Saint Petersburg",
                            "short_name": "Saint Petersburg",
                            "types": ["administrative_area_level_2", "political"]
                        },
                        {
                            "long_name": "Saint Petersburg",
                            "short_name": "Saint Petersburg",
                            "types": ["administrative_area_level_1", "political"]
                        },
                        {
                            "long_name": "Russia",
                            "short_name": "RU",
                            "types": ["country", "political"]
                        }
                    ],
                    "formatted_address": "Saint Petersburg, Russia",
                    "geometry": {
                        "bounds": {
                            "northeast": {
                                "lat": 60.2458091,
                                "lng": 30.7596049
                            },
                            "southwest": {
                                "lat": 59.6337839,
                                "lng": 29.42539399999999
                            }
                        },
                        "location": {
                            "lat": 59.9342173,
                            "lng": 30.33509089999999
                        },
                        "location_type": "APPROXIMATE",
                        "viewport": {
                            "northeast": {
                                "lat": 60.2458091,
                                "lng": 30.7596049
                            },
                            "southwest": {
                                "lat": 59.6337839,
                                "lng": 29.42539399999999
                            }
                        }
                    },
                    "place_id": "ChIJrxHfwIw3lkYRYNv-Lsu0aR8",
                    "types": ["administrative_area_level_2", "political"]
                }
            ],
            "status": "OK"
        }));

        const expectedActions = [
            { type: 'FETCH_LOCAL_WEATHER' },
            { type: 'FETCH_LOCAL_WEATHER_ERROR', payload: defaultError }
        ];

        const store = mockStore(initialState);

        return store.dispatch(actions.fetchLocalWeather()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    test('Should dispatch custom error if google api found city name, but openweather api did not find city', () => {
        const mockGeolocation = {
            getCurrentPosition: jest.fn()
                .mockImplementation((success) => Promise.resolve(success({
                    coords: {
                        latitude: 10,
                        longitude: 10
                    }
                })))
        };
        navigator.geolocation = mockGeolocation;

        fetch.mockResponseOnce(JSON.stringify({
            "results": [
                {
                    "address_components": [
                        {
                            "long_name": "incorrectCityName",
                            "short_name": "СПБ",
                            "types": ["locality", "political"]
                        },
                        {
                            "long_name": "Saint Petersburg",
                            "short_name": "Saint Petersburg",
                            "types": ["administrative_area_level_2", "political"]
                        },
                        {
                            "long_name": "Russia",
                            "short_name": "RU",
                            "types": ["country", "political"]
                        }
                    ],
                    "formatted_address": "St Petersburg, Russia",
                    "geometry": {
                        "bounds": {
                            "northeast": {
                                "lat": 60.233527,
                                "lng": 30.7349362
                            },
                            "southwest": {
                                "lat": 59.6468681,
                                "lng": 29.4464432
                            }
                        },
                        "location": {
                            "lat": 59.9342802,
                            "lng": 30.3350986
                        },
                        "location_type": "APPROXIMATE",
                        "viewport": {
                            "northeast": {
                                "lat": 60.233527,
                                "lng": 30.7349362
                            },
                            "southwest": {
                                "lat": 59.6468681,
                                "lng": 29.4464432
                            }
                        }
                    },
                    "place_id": "ChIJ7WVKx4w3lkYR_46Eqz9nx20",
                    "types": ["locality", "political"]
                },
                {
                    "address_components": [
                        {
                            "long_name": "Saint Petersburg",
                            "short_name": "Saint Petersburg",
                            "types": ["administrative_area_level_2", "political"]
                        },
                        {
                            "long_name": "Saint Petersburg",
                            "short_name": "Saint Petersburg",
                            "types": ["administrative_area_level_1", "political"]
                        },
                        {
                            "long_name": "Russia",
                            "short_name": "RU",
                            "types": ["country", "political"]
                        }
                    ],
                    "formatted_address": "Saint Petersburg, Russia",
                    "geometry": {
                        "bounds": {
                            "northeast": {
                                "lat": 60.2458091,
                                "lng": 30.7596049
                            },
                            "southwest": {
                                "lat": 59.6337839,
                                "lng": 29.42539399999999
                            }
                        },
                        "location": {
                            "lat": 59.9342173,
                            "lng": 30.33509089999999
                        },
                        "location_type": "APPROXIMATE",
                        "viewport": {
                            "northeast": {
                                "lat": 60.2458091,
                                "lng": 30.7596049
                            },
                            "southwest": {
                                "lat": 59.6337839,
                                "lng": 29.42539399999999
                            }
                        }
                    },
                    "place_id": "ChIJrxHfwIw3lkYRYNv-Lsu0aR8",
                    "types": ["administrative_area_level_2", "political"]
                }
            ],
            "status": "OK"
        }));

        const expectedActions = [
            { type: 'FETCH_LOCAL_WEATHER' },
            { type: 'FETCH_LOCAL_WEATHER_ERROR', payload: 'Weather for your city is not available :(' }
        ];

        const store = mockStore(initialState);

        return store.dispatch(actions.fetchLocalWeather()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    test('Should dispatch success if google api found city name and openweather api found city', () => {
        const mockGeolocation = {
            getCurrentPosition: jest.fn()
                .mockImplementation((success) => Promise.resolve(success({
                    coords: {
                        latitude: 10,
                        longitude: 10
                    }
                })))
        };
        navigator.geolocation = mockGeolocation;

        fetch.mockResponseOnce(JSON.stringify({
            "results": [
                {
                    "address_components": [
                        {
                            "long_name": "correctCityName",
                            "short_name": "СПБ",
                            "types": ["locality", "political"]
                        },
                        {
                            "long_name": "Saint Petersburg",
                            "short_name": "Saint Petersburg",
                            "types": ["administrative_area_level_2", "political"]
                        },
                        {
                            "long_name": "Russia",
                            "short_name": "RU",
                            "types": ["country", "political"]
                        }
                    ],
                    "formatted_address": "St Petersburg, Russia",
                    "geometry": {
                        "bounds": {
                            "northeast": {
                                "lat": 60.233527,
                                "lng": 30.7349362
                            },
                            "southwest": {
                                "lat": 59.6468681,
                                "lng": 29.4464432
                            }
                        },
                        "location": {
                            "lat": 59.9342802,
                            "lng": 30.3350986
                        },
                        "location_type": "APPROXIMATE",
                        "viewport": {
                            "northeast": {
                                "lat": 60.233527,
                                "lng": 30.7349362
                            },
                            "southwest": {
                                "lat": 59.6468681,
                                "lng": 29.4464432
                            }
                        }
                    },
                    "place_id": "ChIJ7WVKx4w3lkYR_46Eqz9nx20",
                    "types": ["locality", "political"]
                },
                {
                    "address_components": [
                        {
                            "long_name": "Saint Petersburg",
                            "short_name": "Saint Petersburg",
                            "types": ["administrative_area_level_2", "political"]
                        },
                        {
                            "long_name": "Saint Petersburg",
                            "short_name": "Saint Petersburg",
                            "types": ["administrative_area_level_1", "political"]
                        },
                        {
                            "long_name": "Russia",
                            "short_name": "RU",
                            "types": ["country", "political"]
                        }
                    ],
                    "formatted_address": "Saint Petersburg, Russia",
                    "geometry": {
                        "bounds": {
                            "northeast": {
                                "lat": 60.2458091,
                                "lng": 30.7596049
                            },
                            "southwest": {
                                "lat": 59.6337839,
                                "lng": 29.42539399999999
                            }
                        },
                        "location": {
                            "lat": 59.9342173,
                            "lng": 30.33509089999999
                        },
                        "location_type": "APPROXIMATE",
                        "viewport": {
                            "northeast": {
                                "lat": 60.2458091,
                                "lng": 30.7596049
                            },
                            "southwest": {
                                "lat": 59.6337839,
                                "lng": 29.42539399999999
                            }
                        }
                    },
                    "place_id": "ChIJrxHfwIw3lkYRYNv-Lsu0aR8",
                    "types": ["administrative_area_level_2", "political"]
                }
            ],
            "status": "OK"
        }));

        const expectedActions = [
            { type: 'FETCH_LOCAL_WEATHER' },
            {
                type: 'FETCH_LOCAL_WEATHER_SUCCESS',
                payload: {
                    city: 'correctCityName',
                    weather: {
                        iconUrl: "http://openweathermap.org/img/w/50n.png",
                        description: "mist",
                        temperature: "14",
                        pressure: 1022,
                        humidity: 100,
                        windSpeed: 3.6
                    }
                }
            }
        ];

        const store = mockStore(initialState);

        return store.dispatch(actions.fetchLocalWeather()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    test('Should dispatch custom error if browser does not support geolocation access and openweather api did not find default city', () => {
        navigator.geolocation = null;

        fetch.mockResponseOnce(JSON.stringify({}));

        const expectedActions = [
            { type: 'FETCH_LOCAL_WEATHER' },
            { type: 'FETCH_LOCAL_WEATHER_ERROR', payload: 'Weather for your city is not available :(' }
        ];

        const store = mockStore(initialState);

        return store.dispatch(actions.fetchLocalWeather('incorrectCityName')).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    test('Should dispatch success if browser does not support geolocation access and openweather api found default city', () => {
        navigator.geolocation = null;

        fetch.mockResponseOnce(JSON.stringify({}));

        const expectedActions = [
            { type: 'FETCH_LOCAL_WEATHER' },
            {
                type: 'FETCH_LOCAL_WEATHER_SUCCESS',
                payload: {
                    city: 'correctCityName',
                    weather: {
                        iconUrl: "http://openweathermap.org/img/w/50n.png",
                        description: "mist",
                        temperature: "14",
                        pressure: 1022,
                        humidity: 100,
                        windSpeed: 3.6
                    }
                }
            }
        ];

        const store = mockStore(initialState);

        return store.dispatch(actions.fetchLocalWeather('correctCityName')).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    // Finish last two tests
    test('Should dispatch custom error if user denied access to geolocation access and openweather api did not find default city', () => {
        const mockGeolocation = {
            getCurrentPosition: jest.fn()
                .mockImplementation((success) => Promise.resolve(success({
                    coords: {
                        latitude: 10,
                        longitude: 10
                    }
                })))
        };
        navigator.geolocation = mockGeolocation;

        fetch.mockResponseOnce(JSON.stringify({}));

        const expectedActions = [
            { type: 'FETCH_LOCAL_WEATHER' },
            { type: 'FETCH_LOCAL_WEATHER_ERROR', payload: 'Weather for your city is not available :(' }
        ];

        const store = mockStore(initialState);

        return store.dispatch(actions.fetchLocalWeather('incorrectCityName')).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    test('Should dispatch success if user denied access to geolocation access and openweather api found default city', () => {
        const mockGeolocation = {
            getCurrentPosition: jest.fn()
                .mockImplementation((success) => Promise.resolve(success({
                    coords: {
                        latitude: 10,
                        longitude: 10
                    }
                })))
        };
        navigator.geolocation = mockGeolocation;

        fetch.mockResponseOnce(JSON.stringify({}));

        const expectedActions = [
            { type: 'FETCH_LOCAL_WEATHER' },
            {
                type: 'FETCH_LOCAL_WEATHER_SUCCESS',
                payload: {
                    city: 'correctCityName',
                    weather: {
                        iconUrl: "http://openweathermap.org/img/w/50n.png",
                        description: "mist",
                        temperature: "14",
                        pressure: 1022,
                        humidity: 100,
                        windSpeed: 3.6
                    }
                }
            }
        ];

        const store = mockStore(initialState);

        return store.dispatch(actions.fetchLocalWeather('correctCityName')).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});