import React from 'react';
import ReactDOM from 'react-dom';
import 'font-awesome/scss/font-awesome.scss';

import App from './components/App';

const scss = require('./styles/app.scss');

ReactDOM.render(<App />,
	document.getElementById('root')
);
