import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchLocalWeather } from '../actions/LocalWeatherActions';

import Loader from './Loader';

class LocalWeather extends Component {
    componentDidMount() {
        this.props.fetchLocalWeather();
    }

    render() {
        const { localWeather, fetchLocalWeather } = this.props;

        if (localWeather.isFetching) {
            return (
                <Loader />
            )
        }
        if (localWeather.error !== null) {
            return (
                <>
                    <button onClick={fetchLocalWeather}>Update local weather</button>
                    <div>{localWeather.error}</div>
                </>
            )
        }
        else {
            return (
                <>
                    <button onClick={fetchLocalWeather}>Update local weather</button>
                    <div id='left-block'>
                        <div id='city-name'>{localWeather.city}</div>
                        <div id='icon-temp'>
                            <img src={localWeather.weather.iconUrl} alt='Weather icon' />
                            <div id='temp'>{localWeather.weather.temperature}°C</div>
                        </div>
                    </div>
                    <div id='right-block'>
                        <div id='description'>{localWeather.weather.description}</div>
                        <div>Barometer {localWeather.weather.pressure} hPa</div>
                        <div>Humidity {localWeather.weather.humidity} %</div>
                        <div>Wind {localWeather.weather.windSpeed} m/s</div>
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