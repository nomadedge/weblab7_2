import React from 'react';
import CityWeather from '../../components/CityWeather';
import renderer from 'react-test-renderer';

describe('CityWeather component', () => {
    test('matches the snapshot', () => {
        const city = {
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
        };

        const tree = renderer.create(
            <CityWeather city={city} />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});