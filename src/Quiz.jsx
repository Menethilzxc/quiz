import { Route, Routes } from 'react-router-dom';
import { Header } from './components';
import { Main, PageTest, TestEdit } from './pages/';
import styled from 'styled-components';

const AppColumn = styled.div`
	display: flex;
	flex-direction: column;
	width: 1000px;
	min-height: 100%;
	margin: 0 auto;
`;

function Quiz() {
	return (
		<AppColumn>
			<Header />
			<Routes>
				<Route path="/" element={<Main />} />
				<Route path="/test/" element={<PageTest />} />
				<Route path="/test/edit" element={<TestEdit />} />
				<Route path="*" element={<div>Ошибка</div>} />
			</Routes>
		</AppColumn>
	);
}

export default Quiz;
