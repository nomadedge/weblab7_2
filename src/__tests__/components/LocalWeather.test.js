import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import LocalWeather from '../../components/LocalWeather';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('LocalWeather component', () => {
    test('matches the snapshot on loading', () => {
        const localCity = {
            isFetching: true,
            city: null,
            weather: {},
            error: null
        };

        const store = mockStore({
            localWeather: localCity
        });

        const tree = renderer.create(
            <Provider store={store}>
                <LocalWeather />
            </Provider>
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    test('matches the snapshot on custom error', () => {
        const localCity = {
            isFetching: false,
            city: 'Kiyv',
            weather: {},
            error: 'Weather for your city is not available :('
        };

        const store = mockStore({
            localWeather: localCity
        });

        const tree = renderer.create(
            <Provider store={store}>
                <LocalWeather />
            </Provider>
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    test('matches the snapshot on success', () => {
        const localCity = {
            isFetching: false,
            city: 'Kiyv',
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

        const store = mockStore({
            localWeather: localCity
        });

        const tree = renderer.create(
            <Provider store={store}>
                <LocalWeather />
            </Provider>
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});