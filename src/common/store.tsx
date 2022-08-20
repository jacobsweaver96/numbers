import { configureStore, compose } from '@reduxjs/toolkit';
import reducer from './reducer';

const preloadedState = {};

const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
        : compose;

const enhancers = composeEnhancers();

const configureStoreOptions = {
    reducer,
    preloadedState,
    enhancers,
};

const store = configureStore(configureStoreOptions);

export default store;