function loadFavorites() {
    try {
        const serializedFavorites = localStorage.getItem('favoriteCities');
        if (serializedFavorites === null) return [];
        const favoriteCities = JSON.parse(serializedFavorites);
        const favorites = favoriteCities.map(cityName => {
            return {
                name: cityName,
                isFetching: false,
                error: null,
                weather: {}
            };
        });
        return favorites;
    }
    catch (e) {
        return [];
    }
}

const initialState = {
    cities: loadFavorites()
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'ADD_CITY': {
            const cities = [...state.cities, {
                name: action.payload,
                isFetching: false,
                error: null,
                weather: {}
            }];
            return {
                ...state,
                cities
            };
        }
        case 'DELETE_CITY': {
            const cities = [...state.cities];
            const index = cities.findIndex(city => city.name === action.payload);
            if (index === -1) {
                return state;
            }
            cities.splice(index, 1);
            return {
                ...state,
                cities
            };
        }
        case 'FETCH_CITY_WEATHER': {
            const cities = [...state.cities];
            const index = cities.findIndex(city => city.name === action.payload);
            if (index === -1) {
                return state;
            }
            cities[index] = {
                ...cities[index],
                isFetching: true
            };
            return {
                ...state,
                cities
            };
        }
        case 'FETCH_CITY_WEATHER_SUCCESS': {
            const cities = [...state.cities];
            const index = cities.findIndex(city => city.name === action.payload.city);
            if (index === -1) {
                return state;
            }
            cities[index] = {
                ...cities[index],
                isFetching: false,
                weather: action.payload.weather
            };
            return {
                ...state,
                cities
            };
        }
        case 'FETCH_CITY_WEATHER_ERROR': {
            const cities = [...state.cities];
            const index = cities.findIndex(city => city.name === action.payload.city);
            if (index === -1) {
                return state;
            }
            cities[index] = {
                ...cities[index],
                isFetching: false,
                error: action.payload.error
            };
            return {
                ...state,
                cities
            };
        }
        default: {
            return state;
        }
    }
}