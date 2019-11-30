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
    isAdding: false,
    cities: loadFavorites()
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'ADD_CITY': {
            const newState = { ...state, isAdding: true };
            return newState;
        }
        case 'ADD_CITY_SUCCESS': {
            const newState = { ...state, isAdding: false };
            const index = newState.cities.findIndex(city => city.name.toLowerCase() === action.payload.name.toLowerCase());
            if (index === -1) {
                newState.cities.push({
                    name: action.payload.name,
                    isFetching: false,
                    error: null,
                    weather: action.payload.weather
                });
                return newState;
            }
            alert('This city is already added.')
            return newState;
        }
        case 'ADD_CITY_ERROR': {
            const newState = { ...state, isAdding: false };
            return newState;
        }
        case 'DELETE_CITY': {
            const newState = { ...state };
            const index = newState.cities.findIndex(city => city.name.toLowerCase() === action.payload.toLowerCase());
            if (index === -1) {
                return state;
            }
            newState.cities.splice(index, 1);
            return newState;
        }
        case 'FETCH_CITY_WEATHER': {
            const newState = { ...state };
            const index = newState.cities.findIndex(city => city.name.toLowerCase() === action.payload.toLowerCase());
            if (index === -1) {
                return state;
            }
            newState.cities[index] = {
                ...newState.cities[index],
                isFetching: true,
                error: null,
                weather: {}
            };
            return newState;
        }
        case 'FETCH_CITY_WEATHER_SUCCESS': {
            const newState = { ...state };
            const index = newState.cities.findIndex(city => city.name === action.payload.name);
            if (index === -1) {
                return state;
            }
            newState.cities[index] = {
                ...newState.cities[index],
                isFetching: false,
                error: null,
                weather: action.payload.weather
            };
            return newState;
        }
        case 'FETCH_CITY_WEATHER_ERROR': {
            const newState = { ...state };
            const index = newState.cities.findIndex(city => city.name.toLowerCase() === action.payload.city.toLowerCase());
            if (index === -1) {
                return state;
            }
            newState.cities[index] = {
                ...newState.cities[index],
                isFetching: false,
                error: action.payload.error,
                weather: {}
            };
            return newState;
        }
        default: {
            return state;
        }
    }
}