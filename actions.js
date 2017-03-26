export function setX(id) {
	return {
		type: 'SET_X',
		id,
	};
}

export function reset() {
	return {
		type: 'RESET',
	};
}