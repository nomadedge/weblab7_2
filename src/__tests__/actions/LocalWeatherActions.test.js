jest.mock('../../helpers/weatherGetter.js');

// const mockGeolocation = {
//     getCurrentPosition: jest.fn()
//         .mockImplementationOnce((success) => Promise.resolve(success({
//             coords: {
//                 latitude: 51.1,
//                 longitude: 45.3
//             }
//         })))
// };

// global.navigator.geolocation = mockGeolocation;

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
        fetch.mockResponseOnce(JSON.stringify({}), { status: 400 });

        const expectedActions = [
            { type: 'FETCH_LOCAL_WEATHER' },
            { type: 'FETCH_LOCAL_WEATHER_ERROR', payload: defaultError }
        ];

        const store = mockStore(initialState);

        return store.dispatch(actions.fetchLocalWeather('correctCityName')).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        })
    })
});