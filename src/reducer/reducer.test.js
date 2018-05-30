import reducer from './reducer';
import {restartGame, makeGuess, generateAuralUpdate} from '../actions/actions';

describe('Reducer', () => {
	const correctAnswer = 10;

	it('Should set the initial state when nothing is passed in', () => {
		const state = reducer(undefined, {type: '__UNKNOWN'});
		expect(state.guesses).toEqual([]);
		expect(state.feedback).toEqual('Make your guess!');
		expect(state.auralStatus).toEqual('');
		expect(state.correctAnswer).toBeGreaterThanOrEqual(1);
		expect(state.correctAnswer).toBeLessThanOrEqual(100);
	});

	it('Should return the current state on an unknown action', () => {
		let currentState = {};
		const state = reducer(currentState, {type: '__UNKNOWN'});
		expect(state).toBe(currentState);
	});


	describe('restartGame', () => {
		it('Should start a new game', () => {
			let state = {
				guesses: [22,23,27,10],
				feedback: "You're warm",
				correctAnswer: 39
			};
			const correctAnswer = 42;
			state = reducer(state, restartGame(correctAnswer));
			expect(state.guesses).toEqual([]);
			expect(state.feedback).toEqual('Make your guess!');
			expect(state.auralStatus).toEqual('');
			expect(state.correctAnswer).toBeGreaterThan(1);
			expect(state.correctAnswer).toBeLessThanOrEqual(100);			
		});
	});

	describe('makeGuess', () => {
		it('Should make a guess and provide feedback', () => {
			let state = {
				guesses: [],
				feedback: '',
				correctAnswer: 75
			};
			state = reducer(state, makeGuess(22));
			expect(state.guesses).toEqual([22]);
			expect(state.feedback).toEqual("You're Ice Cold...");
			state = reducer(state, makeGuess(42));
			expect(state.guesses).toEqual([22, 42]);
			expect(state.feedback).toEqual("You're Cold...");
			state = reducer(state, makeGuess(62));
			expect(state.guesses).toEqual([22, 42, 62]);
			expect(state.feedback).toEqual("You're Warm.");
			state = reducer(state, makeGuess(74));
			expect(state.guesses).toEqual([22, 42, 62, 74]);
			expect(state.feedback).toEqual("You're Hot!");
			state = reducer(state, makeGuess(75));
			expect(state.guesses).toEqual([22, 42, 62, 74, 75]);
			expect(state.feedback).toEqual("You got it!");
		});
	});

	describe('generateAuralUpdate', () => {
		it('Should provide aural feedback', () => {
			let state = {
				guesses: [1,5,8],
				feedback: "You're Cold...",
				auralStatus: ''
			};

			state = reducer(state, generateAuralUpdate());
			expect(state.auralStatus).toEqual(
				"Here's the status of the game right now: You're Cold... You've made 3 guesses. In order of most- to least-recent, they are: 8, 5, 1"
			);
		});
	});

});