const initialState = {
    isFetching: false,
    name: null,
    weather: {},
    error: null
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'FETCH_LOCAL_WEATHER': {
            return {
                ...state,
                isFetching: true,
                weather: {},
                error: null
            };
        }
        case 'FETCH_LOCAL_WEATHER_ERROR': {
            return {
                ...state,
                isFetching: false,
                weather: {},
                error: action.payload
            };
        }
        case 'FETCH_LOCAL_WEATHER_SUCCESS': {
            return {
                ...state,
                isFetching: false,
                name: action.payload.name,
                weather: action.payload.weather,
                error: null
            };
        }
        default: {
            return state;
        }
    }
}