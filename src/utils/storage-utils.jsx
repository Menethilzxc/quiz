const HISTORY_KEY = 'testHistory';

export const getTestHistory = () => {
	const history = localStorage.getItem(HISTORY_KEY);

	return history ? JSON.parse(history) : [];
};

export const saveTestResult = (result) => {
	const history = getTestHistory();
	history.push(result);
	localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
};
