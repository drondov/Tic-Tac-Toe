import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

@connect()
export default class Square extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			char: this.getChar(this.props.type),
		};
	}

	componentWillReceiveProps(newProps) {
		this.setState({
			char: this.getChar(newProps.type),
		});
	}

	getChar(type) {
		if (type === 1) {
			return 'O';
		}
		if (type === -1) {
			return 'X';
		}
		return '';
	}

	setX() {
		if (this.props.type) return;
		this.props.dispatch(actions.setX(this.props.id));
	}

	render() {
		return <div className="tc-square" onClick={this.setX.bind(this)}>
			{this.state.char}
		</div>
	}
}