import React from 'react';
import { Provider } from 'react-redux';
import FavoriteCityWeather from '../../components/FavoriteCityWeather';
import renderer from 'react-test-renderer';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

let existingArray;
beforeEach(() => {
    existingArray = [
        {
            name: 'correctCityName',
            isFetching: true,
            error: null,
            weather: {}
        }
    ];
});

describe('FavoriteCityWeather component', () => {
    test('matches the snapshot on loading', () => {
        const store = mockStore({
            favoriteCities: {
                cities: existingArray
            }
        });

        const tree = renderer.create(
            <Provider store={store}>
                <FavoriteCityWeather cityName='correctCityName' />
            </Provider>
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    test('matches the snapshot after loading for correct city', () => {
        existingArray[0].isFetching = false;
        existingArray[0].weather = {
            iconUrl: "http://openweathermap.org/img/w/50n.png",
            description: "mist",
            temperature: "14",
            pressure: 1022,
            humidity: 100,
            windSpeed: 3.6
        };

        const store = mockStore({
            favoriteCities: {
                cities: existingArray
            }
        });

        const tree = renderer.create(
            <Provider store={store}>
                <FavoriteCityWeather cityName='correctCityName' />
            </Provider>
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    test('matches the snapshot after loading error', () => {
        existingArray[0].isFetching = false;
        existingArray[0].error = 'Loading error.';

        const store = mockStore({
            favoriteCities: {
                cities: existingArray
            }
        });

        const tree = renderer.create(
            <Provider store={store}>
                <FavoriteCityWeather cityName='correctCityName' />
            </Provider>
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});