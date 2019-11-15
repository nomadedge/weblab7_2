import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addCity, deleteCity } from '../actions/FavoriteCitiesActions';

import FavoriteCityWeather from './FavoriteCityWeather';

class Favorites extends Component {
    handleAdd = event => {
        event.preventDefault();
        this.props.addCity(event.target[0].value, this.props.favoriteCities);
        event.target[0].value = '';
    }

    handleDelete = cityName => {
        this.props.deleteCity(cityName);
    };

    render() {
        return (
            <>
                <form name='cityAdd' onSubmit={this.handleAdd}>
                    <input placeholder='Enter new favorite city' />
                    <input type='submit' value='Add city' />
                </form>

                {this.props.favoriteCities.map(city => (
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

const mapStateToProps = ({ favoriteCities }) => {
    return {
        favoriteCities: favoriteCities.cities,
    };
};
const mapDispatchToProps = {
    addCity: addCity,
    deleteCity: deleteCity
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);