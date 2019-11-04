import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchCityWeather } from '../actions/FavoriteCitiesActions';

import Loader from './Loader';

import '../styles/Weather.css';

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
                    <div id='weather-container'>

                        <div id='left-block'>
                            <button id='delete-button' onClick={() => onDelete(city.name)}>Delete city</button>
                            <div id='city-name'>{city.name}</div>
                        </div>
                        <div id='right-block'>
                            <Loader />
                        </div>
                    </div>
                </>
            )
        }
        if (city.error !== null) {
            return (
                <>
                    <div id='weather-container'>
                        <div id='left-block'>
                            <button id='delete-button' onClick={() => onDelete(city.name)}>Delete city</button>
                            <div id='city-name'>{city.name}</div>
                        </div>
                        <div id='right-block'>
                            <div>{city.error}</div>
                        </div>
                    </div>
                </>
            )
        }

        return (
            <>
                <div id='weather-container'>
                    <div id='left-block'>
                        <button id='delete-button' onClick={() => onDelete(city.name)}>Delete city</button>
                        <div id='city-name'>{city.name}</div>
                        <div id='icon-temp'>
                            <img src={city.weather.iconUrl} alt='Weather icon' />
                            <div id='temp'>{city.weather.temperature}°C</div>
                        </div>
                    </div>
                    <div id='right-block'>
                        <div className='info'>
                            <div>Description:</div>
                            <div className='value'>{city.weather.description}</div>
                        </div>
                        <div className='info'>
                            <div>Barometer:</div>
                            <div className='value'>{city.weather.pressure} hPa</div>
                        </div>
                        <div className='info'>
                            <div>Humidity:</div>
                            <div className='value'>{city.weather.humidity} %</div>
                        </div>
                        <div className='info'>
                            <div>Wind:</div>
                            <div className='value'>{city.weather.windSpeed} m/s</div>
                        </div>
                    </div>
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