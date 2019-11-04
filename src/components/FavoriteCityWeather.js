import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchCityWeather } from '../actions/FavoriteCitiesActions';

import Loader from './Loader';
class FavoriteCityWeather extends Component {
    componentDidMount() {
        const { cityName, fetchCityWeather } = this.props;
        fetchCityWeather(cityName);
    }

    render() {
        const { onDelete, favoriteCities } = this.props;
        const city = favoriteCities.find(city => city.name === this.props.cityName);

        if (city.isFetching) {
            return (
                <>
                    <div id='top-block'>
                        <div id='city-name'>{city.name}</div>
                        <button onClick={() => onDelete(city.name)}>Delete city</button>
                    </div>
                    <Loader />
                </>
            )
        }
        if (city.error !== null) {
            return (
                <>
                    <div id='top-block'>
                        <div id='city-name'>{city.name}</div>
                        <button onClick={() => onDelete(city.name)}>Delete city</button>
                    </div>
                    <div>{city.error}</div>
                </>
            )
        }

        return (
            <>
                <div id='top-block'>
                    <div id='city-name'>{city.name}</div>
                    <div id='icon-temp'>
                        <img src={city.weather.iconUrl} alt='Weather icon' />
                        <div id='temp'>{city.weather.temperature}°C</div>
                    </div>
                    <button onClick={() => onDelete(city.name)}>Delete city</button>
                </div>

                <div id='bottom-block'>
                    <div id='description'>{city.weather.description}</div>
                    <div>Barometer {city.weather.pressure} hPa</div>
                    <div>Humidity {city.weather.humidity} %</div>
                    <div>Wind {city.weather.windSpeed} m/s</div>
                </div>
            </>
        );
    }
}

const mapStateToProps = ({ favoriteCities }) => {
    return {
        favoriteCities: favoriteCities.cities
    };
};
const mapDispatchToProps = {
    fetchCityWeather: fetchCityWeather
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteCityWeather);