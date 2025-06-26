import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Quiz from './Quiz';
import { store } from './store';
import './index.css';

createRoot(document.getElementById('root')).render(
	<BrowserRouter
		future={{
			v7_startTransition: true,
			v7_relativeSplatPath: true,
		}}
	>
		<Provider store={store}>
			<Quiz />
		</Provider>
	</BrowserRouter>,
);
