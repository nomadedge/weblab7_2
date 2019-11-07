import reducer from '../../reducers/FavoriteCitiesReducer';
import defaultError from '../../helpers/constants';

const existingArray = [
    {
        name: 'Kirov',
        isFetching: false,
        error: null,
        weather: {}
    },
    {
        name: 'Kyiv',
        isFetching: false,
        error: null,
        weather: {}
    }
];

const middleState = { cities: existingArray };

describe('Favorite cities reducer', () => {
    test('Should return the initial state by default (empty array)', () => {
        const expectedResult = { cities: [] };

        expect(reducer(undefined, {})).toEqual(expectedResult);
    });

    test('Should add city to the initial state', () => {
        const expectedResult = {
            cities: [
                {
                    name: 'Kirov',
                    isFetching: false,
                    error: null,
                    weather: {}
                }
            ]
        };

        expect(reducer(undefined, { type: 'ADD_CITY', payload: 'Kirov' }))
            .toEqual(expectedResult);
    });

    test('Should add city to an existing array', () => {
        const expectedArray = [...existingArray, {
            name: 'Broken dreams',
            isFetching: false,
            error: null,
            weather: {}
        }];

        const expectedResult = { cities: expectedArray };

        expect(reducer(middleState, { type: 'ADD_CITY', payload: 'Broken dreams' }))
            .toEqual(expectedResult);
    });

    test('Should return an unchanged state if try to delete not existing city', () => {
        expect(reducer(middleState, { type: 'DELETE_CITY', payload: 'Broken dreams' }))
            .toEqual(middleState);
    });

    test('Should delete city if exists', () => {
        const expectedResult = {
            cities: [
                {
                    name: 'Kyiv',
                    isFetching: false,
                    error: null,
                    weather: {}
                }
            ]
        };

        expect(reducer(middleState, { type: 'DELETE_CITY', payload: 'Kirov' }))
            .toEqual(expectedResult);
    });

    test('Should return an unchanged state if try to start fetching data for not existing city', () => {
        expect(reducer(middleState, { type: 'FETCH_CITY_WEATHER', payload: 'Broken dreams' }))
            .toEqual(middleState);
    });

    test('Should handle the start of fetching', () => {
        const expectedResult = {
            cities: [
                {
                    name: 'Kirov',
                    isFetching: true,
                    error: null,
                    weather: {}
                },
                {
                    name: 'Kyiv',
                    isFetching: false,
                    error: null,
                    weather: {}
                }
            ]
        };

        expect(reducer(middleState, { type: 'FETCH_CITY_WEATHER', payload: 'Kirov' }))
            .toEqual(expectedResult);
    })

    test('Should return an unchanged state if try to finish fetching with error for not existing city', () => {
        expect(reducer(middleState, { type: 'FETCH_CITY_WEATHER_ERROR', payload: 'Broken dreams' }))
            .toEqual(middleState);
    });

    test('Should handle the finish of fetching with error', () => {
        const startState = {
            cities: [
                {
                    name: 'Kirov',
                    isFetching: true,
                    error: null,
                    weather: {}
                },
                {
                    name: 'Kyiv',
                    isFetching: false,
                    error: null,
                    weather: {}
                }
            ]
        };

        const expectedResult = {
            cities: [
                {
                    name: 'Kirov',
                    isFetching: false,
                    error: defaultError,
                    weather: {}
                },
                {
                    name: 'Kyiv',
                    isFetching: false,
                    error: null,
                    weather: {}
                }
            ]
        };

        expect(reducer(startState, { type: 'FETCH_CITY_WEATHER_ERROR', payload: { city: 'Kirov', error: defaultError } }))
            .toEqual(expectedResult);
    });

    test('Should return an unchanged state if try to finish fetching with success for not existing city', () => {
        expect(reducer(middleState, { type: 'FETCH_CITY_WEATHER_SUCCESS', payload: 'Broken dreams' }))
            .toEqual(middleState);
    });

    test('Should handle the finish of fetching with success', () => {
        const startState = {
            cities: [
                {
                    name: 'Kirov',
                    isFetching: true,
                    error: null,
                    weather: {}
                },
                {
                    name: 'Kyiv',
                    isFetching: false,
                    error: null,
                    weather: {}
                }
            ]
        };

        const expectedResult = {
            cities: [
                {
                    name: 'Kirov',
                    isFetching: false,
                    error: null,
                    weather: {
                        iconUrl: "http://openweathermap.org/img/w/50n.png",
                        description: "mist",
                        temperature: "14",
                        pressure: 1022,
                        humidity: 100,
                        windSpeed: 3.6
                    }
                },
                {
                    name: 'Kyiv',
                    isFetching: false,
                    error: null,
                    weather: {}
                }
            ]
        };

        expect(reducer(startState, {
            type: 'FETCH_CITY_WEATHER_SUCCESS',
            payload: {
                city: 'Kirov',
                weather: {
                    iconUrl: "http://openweathermap.org/img/w/50n.png",
                    description: "mist",
                    temperature: "14",
                    pressure: 1022,
                    humidity: 100,
                    windSpeed: 3.6
                }
            }
        })).toEqual(expectedResult);
    });
});