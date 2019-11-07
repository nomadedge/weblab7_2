import reducer from '../../reducers/LocalWeatherReducer';
import defaultError from '../../helpers/constants';

describe('Local weather reducer', () => {
    test('Should return the initial state by default', () => {
        const expectedResult = {
            isFetching: false,
            city: null,
            weather: {},
            error: null
        };

        expect(reducer(undefined, {})).toEqual(expectedResult);
    });

    test('Should handle the start of fetching', () => {
        const expectedResult = {
            isFetching: true,
            city: null,
            weather: {},
            error: null
        };

        expect(reducer(undefined, { type: 'FETCH_LOCAL_WEATHER' }))
            .toEqual(expectedResult);
    });

    test('Should handle the finish of fetching with error', () => {
        const expectedResult = {
            isFetching: false,
            city: null,
            weather: {},
            error: defaultError
        };

        expect(reducer(undefined, { type: 'FETCH_LOCAL_WEATHER_ERROR', payload: defaultError }))
            .toEqual(expectedResult);
    });

    test('Should handle the finish of fetching with success', () => {
        const expectedResult = {
            isFetching: false,
            city: 'Witcher',
            weather: {
                iconUrl: "http://openweathermap.org/img/w/50n.png",
                description: "mist",
                temperature: "14",
                pressure: 1022,
                humidity: 100,
                windSpeed: 3.6
            },
            error: null
        };

        expect(reducer({
            isFetching: true,
            city: null,
            weather: {},
            error: null
        }, {
            type: 'FETCH_LOCAL_WEATHER_SUCCESS', payload: {
                city: 'Witcher',
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