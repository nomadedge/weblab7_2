import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import App from '../../components/App';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('App component', () => {
    test('matches the snapshot', () => {
        const localCity = {
            isFetching: true,
            city: null,
            weather: {},
            error: null
        };

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

        const store = mockStore({
            localWeather: {
                localCity
            },
            favoriteCities: {
                cities: existingArray
            }
        });

        const tree = renderer.create(
            <Provider store={store}>
                <App />
            </Provider>
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});