const initialAppState = {
	correctAnswers: [],
	wrongAnswers: [],
};

export const appReducer = (state = initialAppState, action) => {
	switch (action.type) {
		case 'ADD_CORRECT_ANSWER':
			return {
				...state,
				correctAnswers: [...state.correctAnswers, action.payload],
			};
		case 'ADD_WRONG_ANSWER':
			return {
				...state,
				wrongAnswers: [...state.wrongAnswers, action.payload],
			};
		case 'REMOVE_ANSWER':
			return {
				...state,
				correctAnswers: state.correctAnswers.filter(
					(answer) => answer !== String(action.payload),
				),
				wrongAnswers: state.wrongAnswers.filter(
					(answer) => answer !== String(action.payload),
				),
			};
		case 'RESET_TEST':
			return { ...initialAppState };
		default:
			return state;
	}
};
