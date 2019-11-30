import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addCity, deleteCity } from '../actions/FavoriteCitiesActions';

import FavoriteCityWeather from './FavoriteCityWeather';

class Favorites extends Component {
    handleAdd = async event => {
        event.preventDefault();
        const city = event.target[0].value;
        event.target[0].value = 'Adding city...';
        await this.props.addCity(city);
        document.getElementById('input').value = '';
    }

    handleDelete = cityName => {
        this.props.deleteCity(cityName);
    };

    render() {
        const { favoriteCities } = this.props;
        if (favoriteCities.isAdding) {
            return (
                <>
                    <div id='cityAdd'>
                        <form name='cityAdd' onSubmit={this.handleAdd}>
                            <input id='input' placeholder='Enter new favorite city' disabled/>
                            <input type='submit' value='Add city' disabled />
                        </form>
                    </div>

                    {favoriteCities.cities.map(city => (
                        <FavoriteCityWeather
                            key={city.name}
                            cityName={city.name}
                            onDelete={this.handleDelete}
                        />
                    ))}
                </>
            );
        } else {
            return (
                <>
                    <div id='cityAdd'>
                        <form name='cityAdd' onSubmit={this.handleAdd}>
                            <input id='input' placeholder='Enter new favorite city' />
                            <input type='submit' value='Add city' />
                        </form>
                    </div>

                    {favoriteCities.cities.map(city => (
                        <FavoriteCityWeather
                            key={city.name}
                            cityName={city.name}
                            onDelete={this.handleDelete}
                        />
                    ))}
                </>
            );
        }
    }
}

const mapStateToProps = ({ favoriteCities }) => {
    return {
        favoriteCities: favoriteCities,
    };
};
const mapDispatchToProps = {
    addCity: addCity,
    deleteCity: deleteCity
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);