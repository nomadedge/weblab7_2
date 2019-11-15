import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchLocalWeather } from '../actions/LocalWeatherActions';

import Loader from './Loader';
import CityWeather from './CityWeather';

import '../styles/Weather.css';

class LocalWeather extends Component {
    componentDidMount() {
        this.props.fetchLocalWeather();
    }

    render() {
        const { localWeather, fetchLocalWeather } = this.props;

        if (localWeather.isFetching) {
            return (
                <>
                    <button onClick={fetchLocalWeather}>Update local weather</button>
                    <div id='weather-container'>
                        <Loader />
                    </div>
                </>
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
                        <CityWeather cityWeather={localWeather} />
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