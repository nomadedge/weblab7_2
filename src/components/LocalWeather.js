import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchLocalWeather } from '../actions/LocalWeatherActions';

import Loader from './Loader';

import '../styles/Weather.css';

class LocalWeather extends Component {
    componentDidMount() {
        this.props.fetchLocalWeather();
    }

    render() {
        const { localWeather, fetchLocalWeather } = this.props;

        if (localWeather.isFetching) {
            return (
                <div id='weather-container'>
                    <Loader />
                </div>
            )
        }
        if (localWeather.error !== null) {
            return (
                <>
                    <button onClick={fetchLocalWeather}>Update local weather</button>
                    <div id='weather-container'>
                        <div>{localWeather.error}</div>
                    </div>
                </>
            )
        }
        else {
            return (
                <>
                    <button onClick={fetchLocalWeather}>Update local weather</button>
                    <div id='weather-container'>
                        <div id='left-block'>
                            <div id='city-name'>{localWeather.city}</div>
                            <div id='icon-temp'>
                                <img src={localWeather.weather.iconUrl} alt='Weather icon' />
                                <div id='temp'>{localWeather.weather.temperature}°C</div>
                            </div>
                        </div>
                        <div id='right-block'>
                            <div className='info'>
                                <div>Description:</div>
                                <div className='value'>{localWeather.weather.description}</div>
                            </div>
                            <div className='info'>
                                <div>Barometer:</div>
                                <div className='value'>{localWeather.weather.pressure} hPa</div>
                            </div>
                            <div className='info'>
                                <div>Humidity:</div>
                                <div className='value'>{localWeather.weather.humidity} %</div>
                            </div>
                            <div className='info'>
                                <div>Wind:</div>
                                <div className='value'>{localWeather.weather.windSpeed} m/s</div>
                            </div>
                        </div>
                    </div>
                </>
            );
        }
    }
}

const mapStateToProps = ({ localWeather }) => {
    return {
        localWeather: localWeather,
    };
};
const mapDispatchToProps = {
    fetchLocalWeather: fetchLocalWeather
};

export default connect(mapStateToProps, mapDispatchToProps)(LocalWeather);