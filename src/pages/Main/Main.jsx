import { Link } from 'react-router-dom';
import { Button, Title } from '../../components';
import { getTestHistory } from '../../utils';

import styled from 'styled-components';

const MainContainer = ({ className }) => {
	const history = getTestHistory();

	return (
		<div className={className}>
			<div className="buttons">
				<Link to="/test">
					<Button bghover="#000" colorhover="#fff" margin="0 20px 0 0">
						Запустить тест
					</Button>
				</Link>
				<Link to="/test/edit">
					<Button bghover="#000" colorhover="#fff">
						Редактировать тест
					</Button>
				</Link>
			</div>
			<div className="test-history">
				<Title weight="normal" size="25px" margin="0 0 20px 0">
					История прохождений
				</Title>
				<div className="test-list">
					<ul>
						{history.map((attempt, index) => (
							<li key={index}>
								<span>{attempt.date}</span>{' '}
								<span>
									{' '}
									Верных ответов: {attempt.correct} / {attempt.total}
								</span>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export const Main = styled(MainContainer)`
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	& .buttons {
		display: flex;
		justify-content: center;
		margin: 0 0 60px 0;
	}

	& ul {
		list-style-type: none;
		width: 100%;
		padding: 0;
	}

	& li {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		margin: 0 0 30px 0;
		border: 1px solid #000;
		border-radius: 10px;
		padding: 20px;
		font-size: 22px;
	}

	& .test-history {
		width: 100%;
	}

	& .test-list {
		width: 100%;
	}
`;
