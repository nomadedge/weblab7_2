import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import reducer from './reducers';

const middleware = applyMiddleware(thunk);

function saveFavorites(state) {
    try {
        const favorites = state.favoriteCities.cities.map(city => city.name);
        const serializedFavorites = JSON.stringify(favorites);
        localStorage.setItem('favoriteCities', serializedFavorites);
    }
    catch (e) {
        alert('Local storage is not available :(');
    }
}

const store = createStore(reducer, middleware);

store.subscribe(() => saveFavorites(store.getState()));

export default store;