import React, { Component } from 'react';

import '../styles/Weather.css';

class CityWeather extends Component {
    render() {
        const { city } = this.props;
        return (
            <>
                <div id='left-block'>
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
            </>
        );
    }
}

export default CityWeather;