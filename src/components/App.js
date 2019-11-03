import React, { Component } from 'react';

import LocalWeather from './LocalWeather';
import Favorites from './Favorites';

class App extends Component {
    state = {}
    render() {
        return (
            <>
                <h2>Local weather</h2>
                <LocalWeather />
                <h2>Your favorite cities</h2>
                <Favorites />
            </>
        );
    }
}

export default App;