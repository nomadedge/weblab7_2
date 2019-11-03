import React, { Component } from 'react';

import LocalWeather from './LocalWeather';

class App extends Component {
    state = {}
    render() {
        return (
            <>
                <h2>Local weather</h2>
                <LocalWeather />
            </>);
    }
}

export default App;