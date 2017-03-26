import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';
import Row from './Row';

import * as TicTacToe from '../tic-tac-toe';

@connect((store) => {
	return {
		matrix: store.matrix,
		isFinished: store.isFinished
	};
})
export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentWillReceiveProps(nextProps) {
		this.setStatus({ 
			isFinished: nextProps.isFinished,
			matrix: nextProps.matrix,
		});
	}
	onRestart() {
		this.props.dispatch(actions.reset());
	}
	setStatus({ isFinished, matrix }) {
		let status = '';
		if (isFinished) {
			const winner = TicTacToe.getUtility({ matrix: matrix });
			if (winner > 0) {
				status = 'You are looser!';
			} else if (winner < 0) {
				status = 'You are winner!';
			} else {
				status = 'It\'s draw!';
			}
		}
		this.setState({
			status,
		});
	}
	render() {
		const matrix = this.props.matrix;
	    return (
	        <div className="tc-game">
	        	<div className="tc-board">
	        		{this.props.matrix.map((row, i) => <Row row={row} id={i} key={i}/>)}
	        	</div>
	        	<div className="tc-status">
	        		{this.state.status}
	        		<div>
	        		{this.state.status ? <button className="tc-restart" onClick={this.onRestart.bind(this)}>Restart</button> : null}
	        		</div>
	        		
	        	</div>
	        </div>
	    );
	}
}
