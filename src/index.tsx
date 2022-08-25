import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import store from './common/store';
import './index.css';

const container: Element = document.getElementById('root') ?? document.createElement('div');
const root = ReactDOM.createRoot(container);

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
