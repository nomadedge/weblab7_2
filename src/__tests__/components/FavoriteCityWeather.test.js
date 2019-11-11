import React from 'react';
import { Provider } from 'react-redux';
import FavoriteCityWeather from '../../components/FavoriteCityWeather';
import renderer from 'react-test-renderer';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('FavoriteCityWeather component', () => {
    test('matches the snapshot on loading', () => {
        const existingArray = [
            {
                name: 'correctCityName',
                isFetching: true,
                error: null,
                weather: {}
            },
            {
                name: 'incorrectCityName',
                isFetching: true,
                error: null,
                weather: {}
            }
        ];

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
        const existingArray = [
            {
                name: 'correctCityName',
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
                name: 'incorrectCityName',
                isFetching: false,
                error: 'Weather for this city is not available :(',
                weather: {}
            }
        ];

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

    test('matches the snapshot after loading for incorrect city', () => {
        const existingArray = [
            {
                name: 'correctCityName',
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
                name: 'incorrectCityName',
                isFetching: false,
                error: 'Weather for this city is not available :(',
                weather: {}
            }
        ];

        const store = mockStore({
            favoriteCities: {
                cities: existingArray
            }
        });

        const tree = renderer.create(
            <Provider store={store}>
                <FavoriteCityWeather cityName='incorrectCityName' />
            </Provider>
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});