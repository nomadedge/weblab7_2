import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Favorites from '../../components/Favorites';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const existingArray = [
    {
        name: 'Kirov',
        isFetching: true,
        error: null,
        weather: {}
    },
    {
        name: 'Kiyv',
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
    }
];

describe('Favorites component', () => {
    test('matches the snapshot on adding', () => {
        const store = mockStore({
            favoriteCities: {
                isAdding: true,
                cities: existingArray
            }
        });

        const tree = renderer.create(
            <Provider store={store}>
                <Favorites />
            </Provider>
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});