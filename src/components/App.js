import React, { Component } from 'react';

import LocalWeather from './LocalWeather';
import Favorites from './Favorites';

class App extends Component {
    state = {}
    render() {
        return (
            <>
                <div id='local-weather'>
                    <h2>Local weather</h2>
                    <LocalWeather />
                </div>
                <div id='favorites'>
                    <h2>Your favorite cities</h2>
                    <Favorites />
                </div>
            </>
        );
    }
}

export default App;