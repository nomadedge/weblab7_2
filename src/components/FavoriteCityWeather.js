import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchCityWeather } from '../actions/FavoriteCitiesActions';

import Loader from './Loader';
import CityWeather from './CityWeather';

import '../styles/Weather.css';

class FavoriteCityWeather extends Component {
    componentDidMount() {
        const { cityName, favoriteCities, fetchCityWeather } = this.props;
        const city = favoriteCities.cities.find(city => city.name === cityName);
        if (Object.entries(city.weather).length === 0 && city.weather.constructor === Object && city.error == null) {
            fetchCityWeather(cityName);
        }
    }

    render() {
        const { onDelete, favoriteCities, cityName } = this.props;
        const city = favoriteCities.cities.find(city => city.name === cityName);

        if (city.isFetching) {
            return (
                <div id='favorite'>
                    <div id='weather-container'>
                        <div id='left-block'>
                            <div id='city-name'>{city.name}</div>
                        </div>
                        <div id='right-block'>
                            <Loader />
                        </div>
                    </div>
                </div>
            );
        }
        if (city.error) {
            return (
                <>
                    <div id='favorite'>
                        <button id='delete-button' onClick={() => onDelete(city.name)}>Delete city</button>

                        <div id='weather-container'>
                            <div id='left-block'>
                                <div id='city-name'>{city.name}</div>
                            </div>
                            <div id='right-block'>
                                <div>{city.error}</div>
                            </div>
                        </div>
                    </div>
                </>
            );
        } else {
            return (
                <>
                    <div id='favorite'>
                        <button id='delete-button' onClick={() => onDelete(city.name)}>Delete city</button>

                        <div id='weather-container'>
                            <CityWeather city={city} />
                        </div>
                    </div>
                </>
            );
        }
    }
}

const mapStateToProps = ({ favoriteCities }) => {
    return {
        favoriteCities: favoriteCities
    };
};
const mapDispatchToProps = {
    fetchCityWeather: fetchCityWeather
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteCityWeather);