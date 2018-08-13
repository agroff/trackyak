import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './bootstrap/App';
import registerServiceWorker from './bootstrap/registerServiceWorker';

console.log(process);
console.log(process.env.REACT_APP_API_LOCATION);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
