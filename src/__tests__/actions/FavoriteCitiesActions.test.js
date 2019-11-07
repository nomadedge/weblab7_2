jest.mock('../../helpers/weatherGetter');

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../actions/FavoriteCitiesActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

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

describe('Favorite cities actions. Add city', () => {
    test('Should not add the city with the same name', () => {
        const expectedActions = [];

        const store = mockStore(middleState);

        return store.dispatch(actions.addCity('   kiROv   ', middleState.cities)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    test('Should add the new city', () => {
        const expectedActions = [
            { type: 'ADD_CITY', payload: 'How long can this go on' }
        ];

        const store = mockStore(middleState);

        return store.dispatch(actions.addCity('hoW long CAN thiS Go On', middleState.cities)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});

describe('Favorite cities actions. Delete city', () => {
    test('Should always trigger delete action', () => {
        const expectedActions = [
            { type: 'DELETE_CITY', payload: 'Kirov' }
        ];

        const store = mockStore(middleState);

        return store.dispatch(actions.deleteCity('Kirov')).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});

describe('Favorite cities actions. Fetch city weather', () => {
    test('Should trgger success action if weather is available on OpenWeather', () => {
        const expectedActions = [
            { type: 'FETCH_CITY_WEATHER', payload: 'correctCityName' },
            {
                type: 'FETCH_CITY_WEATHER_SUCCESS',
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

        const store = mockStore(middleState);

        return store.dispatch(actions.fetchCityWeather('correctCityName')).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    test('Should trgger error action if weather is not available on OpenWeather', () => {
        const expectedActions = [
            { type: 'FETCH_CITY_WEATHER', payload: 'incorrectCityName' },
            {
                type: 'FETCH_CITY_WEATHER_ERROR',
                payload: {
                    city: 'incorrectCityName',
                    error: 'Weather for this city is not available :('
                }
            }
        ];

        const store = mockStore(middleState);

        return store.dispatch(actions.fetchCityWeather('incorrectCityName')).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});