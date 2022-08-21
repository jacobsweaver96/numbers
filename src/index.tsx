import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const container: Element = document.getElementById('root') ?? document.createElement('div');
const root = ReactDOM.createRoot(container);

root.render(<App />);
