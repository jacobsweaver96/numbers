import { configureStore, compose, combineReducers } from '@reduxjs/toolkit';
import Middleware from './middleware';
import { modReducer } from '../features/modNetwork';

const rootReducer = combineReducers({
    modState: modReducer,
});

const preloadedState = {};

const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
        : compose;

const enhancers = composeEnhancers();

const configureStoreOptions = {
    reducer: rootReducer,
    middleware: Middleware,
    preloadedState,
};

const store = configureStore(configureStoreOptions);

export default store;