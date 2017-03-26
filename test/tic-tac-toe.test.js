import { expect } from 'chai';
import * as TicTacToe from '../tic-tac-toe';

describe('TicTacToe Test', () => {
	describe('getUtility', () => {
		it('Simple input test', () => {
			const state = {
				matrix: [
					[0, 0, 0],
					[0, 0, 0],
					[0, 0, 0],
				]
			}
			const actual = TicTacToe.getUtility(state);
			expect(actual).to.be.equal(0);
		});
		it('Complex input nobody win', () => {
			const state = {
				matrix: [
					[1, 1, -1],
					[-1, -1, 1],
					[1, 1, -1],
				]
			}
			const actual = TicTacToe.getUtility(state);
			expect(actual).to.be.equal(0);
		});
		it('Horizontal x win', () => {
			const state = {
				matrix: [
					[0, 0, 0],
					[1, 1, 1],
					[0, 0, 0],
				]
			}
			const actual = TicTacToe.getUtility(state);
			expect(actual).to.be.equal(1);
		});
		it('Vertical O win', () => {
			const state = {
				matrix: [
					[-1, 0, 1],
					[-1, 1, 0],
					[-1, 0, 0],
				]
			}
			const actual = TicTacToe.getUtility(state);
			expect(actual).to.be.equal(-1);
		});
		it('Diagonal 1 win', () => {
			const state = {
				matrix: [
					[1, 0, 1],
					[-1, 1, 0],
					[-1, 0, 1],
				]
			}
			const actual = TicTacToe.getUtility(state);
			expect(actual).to.be.equal(1);
		});
		it('Additional diagonal 0 win', () => {
			const state = {
				matrix: [
					[1, 0, -1],
					[1, -1, 0],
					[-1, 1, 1],
				]
			}
			const actual = TicTacToe.getUtility(state);
			expect(actual).to.be.equal(-1);
		});
	});
});