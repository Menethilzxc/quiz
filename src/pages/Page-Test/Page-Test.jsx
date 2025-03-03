import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Title } from '../../components';
import { addCorrectAnswer, addWrongAnswer, removeAnswer, resetTest } from '../../actions';
import { selectCorrectAnswers } from '../../selectors';
import { saveTestResult } from '../../utils';

import styled from 'styled-components';

const PageTestContainer = ({ className }) => {
	const [questions, setQuestions] = useState([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [selectedAnswer, setSelectedAnswer] = useState(null);
	const [completeFlag, setCompleteFlag] = useState(false);
	const correctAnswers = useSelector(selectCorrectAnswers);
	const dispatch = useDispatch();

	useEffect(() => {
		fetch('http://localhost:5000/questions')
			.then((response) => response.json())
			.then((data) => setQuestions(data))
			.catch((error) => console.error('Error fetching questions: ', error));
	}, []);

	const handleNext = () => {
		if (currentIndex < questions.length - 1) {
			setCurrentIndex(currentIndex + 1);
		}
	};

	const handlePrev = () => {
		if (currentIndex > 0) {
			setCurrentIndex(currentIndex - 1);
		}
	};

	const handleComplete = () => {
		const result = {
			date: new Date().toLocaleString(),
			correct: correctAnswers.length,
			total: questions.length,
		};

		saveTestResult(result);
		setCompleteFlag(!completeFlag);
	};

	const handleRestart = () => {
		dispatch(resetTest());
		setCompleteFlag(!completeFlag);
		setCurrentIndex(0);
		setSelectedAnswer(null);
	};

	const handleAnswerClick = (id, text, isCorrect) => {
		const answerId = String(id);

		dispatch(removeAnswer(answerId));

		if (isCorrect) {
			dispatch(addCorrectAnswer(answerId));
		} else {
			dispatch(addWrongAnswer(answerId));
		}

		setSelectedAnswer(answerId);
	};

	const nextButton = (
		<Button
			width="300px"
			bgcolor={currentIndex === questions.length - 1 ? '#5cf525' : '#f3fa20'}
			onClick={handleNext}
		>
			Следующий вопрос
		</Button>
	);

	const completeButton = (
		<Button
			width="300px"
			bgcolor={currentIndex === questions.length - 1 ? '#5cf525' : '#f3fa20'}
			onClick={handleComplete}
			disabled={!selectedAnswer}
		>
			Завершить
		</Button>
	);

	const gameResult = (
		<div className="test-ending">
			<Title weight="500" size="32px" margin="0 0 40px 0">
				Правильных ответов:
			</Title>
			<p style={{ fontSize: '40px', margin: '0 0 40px 0' }}>
				{correctAnswers.length} из 10
			</p>
			<div className="ending-buttons">
				<Link to="/">
					<Button bghover="#000" colorhover="#fff" margin="0 50px 0 0">
						На главную
					</Button>
				</Link>
				<Link to="/test">
					<Button bghover="#000" colorhover="#fff" onClick={handleRestart}>
						Пройти ещё раз
					</Button>
				</Link>
			</div>
		</div>
	);

	return (
		<div className={className}>
			{completeFlag ? (
				gameResult
			) : questions.length > 0 ? (
				<>
					<div className="quest">
						<div className="count-quest">
							Вопрос: {currentIndex + 1} / {questions.length}
						</div>
						<div className="quest-title">
							<Title weight="normal" size="24px" margin="0 0 30px 0">
								{questions[currentIndex].title}
							</Title>
						</div>

						<ul className="quest-list">
							{questions[currentIndex].answers.map(
								({ _id, text, isCorrect }) => (
									<li
										key={_id}
										className={`quest-list-item ${selectedAnswer === _id ? 'selected' : ''}`}
										onClick={() =>
											handleAnswerClick(_id, text, isCorrect)
										}
									>
										{text}
									</li>
								),
							)}
						</ul>
					</div>
					<div className="buttons">
						<Button
							width="300px"
							margin="0 20px 0 0"
							bgcolor="#C0C0C0"
							onClick={handlePrev}
							disabled={currentIndex === 0}
						>
							Предыдущий вопрос
						</Button>
						{currentIndex === questions.length - 1
							? completeButton
							: nextButton}
					</div>
				</>
			) : (
				<p>Загрузка...</p>
			)}
		</div>
	);
};

export const PageTest = styled(PageTestContainer)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	& .quest {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 600px;
		width: 400px;
		margin: 0 0 50px 0;
	}

	& .quest-title {
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		height: 150px;
		width: 100%;
		margin: 0 0 20px 0;
	}

	& .count-quest {
		font-size: 24px;
		margin: 0 0 20px 0;
	}

	& .buttons {
		display: flex;
	}

	& .quest-list {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	& .quest-list-item {
		list-style-type: none;
		font-size: 20px;
		margin-bottom: 20px;
		cursor: pointer;
		padding: 10px;
	}

	& .quest-list-item.selected {
		background-color: yellow;
		border: 1px solid yellow;
		border-radius: 10px;
	}

	& .test-ending {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 400px;
		height: 600px;
	}

	& .ending-buttons {
		display: flex;
	}
`;
