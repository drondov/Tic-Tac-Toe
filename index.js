import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import * as TicTacToe from './tic-tac-toe';
import reducer from './reducer';

import App from './components/App';

const getInitialState = () => ({
	matrix: TicTacToe.createMatrix(),
});

const store = createStore(reducer, getInitialState());

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>, 
	document.getElementById('app'));
