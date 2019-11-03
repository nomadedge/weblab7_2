const initialState = {
    cities: []
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'ADD_CITY': {
            const cities = [...state.cities, {
                name: action.payload,
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
            cities.splice(index, 1);
            return {
                ...state,
                cities
            };
        }
        case 'FETCH_CITY_WEATHER': {
            const cities = [...state.cities];
            const cityToLoadIndex = cities.findIndex(city => city.name === action.payload);
            cities[cityToLoadIndex] = {
                ...cities[cityToLoadIndex],
                isFetching: true
            };
            return {
                ...state,
                cities
            };
        }
        case 'FETCH_CITY_WEATHER_SUCCESS': {
            const cities = [...state.cities];
            const cityToLoadIndex = cities.findIndex(city => city.name === action.payload.city);
            cities[cityToLoadIndex] = {
                ...cities[cityToLoadIndex],
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
            const cityToLoadIndex = cities.findIndex(city => city.name === action.payload.city);
            cities[cityToLoadIndex] = {
                ...cities[cityToLoadIndex],
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