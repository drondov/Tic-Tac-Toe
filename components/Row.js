import React from 'react';

import Square from './Square';
import { N } from '../tic-tac-toe';

export default class Row extends React.Component {
	render() {
		const squares = this.props.row.map((type, i) => {
			const id = this.props.id * N + i;
			return <Square type={type} id={id} key={id} />
		});
		return <div className="tc-row">
			{squares}
		</div>
	}
}

