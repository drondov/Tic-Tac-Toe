import * as TicTacToe from './tic-tac-toe';

export default (state, action) => {
	if (action.type === 'SET_X') {
		if (state.isFinished) return state;
		// Set up user's step
		const matrix = TicTacToe.copyMatrix(state.matrix);
		const x = Math.floor(action.id / TicTacToe.N);
		const y = action.id % TicTacToe.N;
		matrix[x][y] = -1;

		// Maybe this was last possible move ?
		if (TicTacToe.isTerminated({ matrix, player: 'max' })) {
			return Object.assign({}, state, { matrix, isFinished: true });
		}

		// Make opponent step
		const matrixAfterOpponent = TicTacToe.nextStep({ matrix, player: 'max'});
		return Object.assign({}, state, { 
			matrix: matrixAfterOpponent,
			isFinished: TicTacToe.isTerminated({ matrix: matrixAfterOpponent, player: 'min' }),
		});
	}
	if (action.type === 'RESET') {
		return {
			matrix: TicTacToe.createMatrix(),
		};
	}
	return state;
}