export const N = 3;

export function createMatrix(n = N) {
	var matrix = [];
	for (var i = 0; i < n; ++i) {
		matrix[i] = [];
		for (var j = 0; j < n; ++j) {
			matrix[i][j] = 0;
		}
	}
	return matrix;
}

export function copyMatrix(matrix) {
	const newMatrix = [];
	for (let i = 0; i < matrix.length; ++i) {
		newMatrix[i] = [];
		for (let j = 0; j < matrix.length; ++j) {
			newMatrix[i][j] = matrix[i][j];
		}
	}
	return newMatrix;
}

export function getNextPlayer(player) {
	return player === 'max' ? 'min' : 'max';
}

export function getUtility(state) {
	const n = N;
	const { matrix } = state;
	// horizontal
	outer: for (var i = 0; i < n; ++i) {
		if (matrix[i][0] === 0) continue;
		for (var j = 0; j < n; ++j) {
			if (matrix[i][j] !== matrix[i][0]) continue outer;
		}
		return matrix[i][0];
	}
	// vertical
	outer: for (var i = 0; i < n; ++i) {
		if (matrix[0][i] === 0) continue;
		for (var j = 0; j < n; ++j) {
			if (matrix[j][i] !== matrix[0][i]) continue outer;
		}
		return matrix[0][i];
	}
	// main diagonal
	if (matrix[0][0] !== 0) {
		const diagonal = matrix.map((row, i) => row[i]);
		if (diagonal.every(x => x === matrix[0][0])) {
			return matrix[0][0];
		}
	}
	// additional diagonal
	if (matrix[0][n - 1] !== 0) {
		const diagonal = matrix.map((row, i) => row[n - i - 1]);
		if (diagonal.every(x => x === matrix[0][n - 1])) {
			return matrix[0][n - 1];
		}
	}
	return 0;
}

export function getNextStates(state) {
	const n = N;
	const nextPlayer = getNextPlayer(state.player);
	const { matrix } = state;
	const nextStates = [];

	for (let i = 0; i < n; ++i) {
		for (let j = 0; j < n; ++j) {
			if (matrix[i][j] !== 0) continue;
			const newMatrix = copyMatrix(matrix);
			newMatrix[i][j] = state.player === 'max' ? 1 : -1;
			nextStates.push({
				matrix: newMatrix,
				player: nextPlayer,
			});
		}
	}
	return nextStates;
}

export function nextStep(startState) {
	const nextStates = getNextStates(startState);
	for (const state of nextStates) {
		state.value = minmax(state);
	}
	return max(nextStates).matrix;
}

export function isTerminated(state) {
	return !!getUtility(state) || !getNextStates(state).length;
}

function max(states) {
	if (!states.length) return [];
	let maxValue = -Infinity;
	let maxState = null
	for (const state of states) {
		if (state.value > maxValue) {
			maxState = state;
			maxValue = state.value;
		}
	}
	return maxState;
}

function min(states) {
	if (!states.length) return [];
	let minValue = Infinity;
	let minState = null;
	for (const state of states) {
		if (state.value < minValue) {
			minState = state;
			minValue = state.value;
		}
	}
	return minState;
}


function minmax(state) {
	const nextPlayer = getNextPlayer(state.player);
	const nextStates = getNextStates(state);
	// 11 because this number is more then 
	// maximum depth which is 9.
	const utility = 11 * getUtility(state);
	const isTerminated = !!utility || !nextStates.length;

	if (isTerminated) return utility;

	// set value for all nextStates
	nextStates.forEach(newState => {
		newState.value = minmax(newState);
		// less value when more deep.
		newState.value -= Math.sign(newState.value);
	});

	// max-min
	if (state.player === 'max') return max(nextStates).value;
	if (state.player === 'min') return min(nextStates).value;
}
