const initialState = {
    isFetching: false,
    isFetched: false,
    city: null,
    weather: {},
    error: null
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'FETCH_LOCAL_WEATHER': {
            return {
                ...state,
                isFetching: true
            };
        }
        case 'FETCH_LOCAL_WEATHER_ERROR': {
            return {
                ...state,
                isFetching: false,
                error: action.payload
            };
        }
        case 'FETCH_LOCAL_WEATHER_SUCCESS': {
            return {
                ...state,
                isFetching: false,
                isFetched: true,
                city: action.payload.city,
                weather: action.payload.weather
            };
        }
        default: {
            return state;
        }
    }
}