import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Title } from '../../components';
import styled from 'styled-components';

const TestEditContainer = ({ className }) => {
	const [questions, setQuestions] = useState([]);
	const [newAnswer, setNewAnswer] = useState('');
	const [isCorrect, setIsCorrect] = useState(false);

	useEffect(() => {
		fetch('http://localhost:5000/questions')
			.then((response) => response.json())
			.then((data) => setQuestions(data))
			.catch((error) => console.error('Error fetching questions: ', error));
	}, []);

	const handleQuestionChange = (index) => (event) => {
		const newQuestions = [...questions];
		newQuestions[index].title = event.target.value;
		setQuestions(newQuestions);
	};

	const handleAnswerChange = (questionIndex, answerIndex) => (event) => {
		const newQuestions = [...questions];
		newQuestions[questionIndex].answers[answerIndex].text = event.target.value;
		setQuestions(newQuestions);
	};

	const handleAnswerCorrectChange = (questionIndex, answerIndex) => () => {
		const newQuestions = [...questions];
		newQuestions[questionIndex].answers[answerIndex].isCorrect =
			!newQuestions[questionIndex].answers[answerIndex].isCorrect;
		setQuestions(newQuestions);
	};

	const handleAddAnswer = (index) => () => {
		const newQuestions = [...questions];
		newQuestions[index].answers.push({ text: newAnswer, isCorrect });
		setQuestions(newQuestions);
		setNewAnswer('');
		setIsCorrect(false);
	};

	const handleRemoveAnswer = (questionIndex, answerIndex) => () => {
		const newQuestions = [...questions];
		newQuestions[questionIndex].answers.splice(answerIndex, 1);
		setQuestions(newQuestions);
	};

	const handleRemoveQuestion = (index) => () => {
		setQuestions(questions.filter((_, i) => i !== index));
	};

	const handleSave = async () => {
		try {
			const response = await fetch('http://localhost:5000/questions', {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(questions),
			});

			const result = await response.json();
			if (result.success) {
				alert('Тест успешно сохранён!');
			} else {
				alert('Ошибка при сохранении');
			}
		} catch (error) {
			console.error('Ошибка: ', error);
			alert('Ошибка сети!');
		}
	};

	return (
		<div className={className}>
			<div className="title">
				<Title weight="normal" margin="0 0 60px 0">
					Редактирование теста
				</Title>
			</div>
			{questions.length > 0 ? (
				<>
					<div className="test-edit">
						{questions.map(({ _id, title, answers }, questionIndex) => (
							<div key={_id} className="question">
								<input
									type="text"
									value={title}
									onChange={handleQuestionChange(questionIndex)}
									placeholder="Введите текст вопроса"
								/>
								<div className="answers">
									{answers.map((answer, answerIndex) => (
										<div key={answerIndex} className="answer">
											<input
												type="text"
												value={answer.text}
												onChange={handleAnswerChange(
													questionIndex,
													answerIndex,
												)}
												placeholder="Введите вариант ответа"
											/>
											<label>
												Правильный ответ
												<input
													type="checkbox"
													id="checkbox"
													checked={answer.isCorrect}
													onChange={handleAnswerCorrectChange(
														questionIndex,
														answerIndex,
													)}
												/>
											</label>
											<Button
												bgcolor="#eb6434"
												onClick={handleRemoveAnswer(
													questionIndex,
													answerIndex,
												)}
											>
												Удалить вариант
											</Button>
										</div>
									))}
									<div className="add-answer">
										<input
											type="text"
											value={newAnswer}
											onChange={(e) => setNewAnswer(e.target.value)}
											placeholder="Добавить новый вариант ответа"
										/>
										<label>
											Правильный
											<input
												type="checkbox"
												id="checkbox"
												checked={isCorrect}
												onChange={() => setIsCorrect(!isCorrect)}
											/>
										</label>
										<Button
											bgcolor="#5cf525"
											margin="10px 0 0 0"
											onClick={handleAddAnswer(questionIndex)}
										>
											Добавить вариант
										</Button>
									</div>
								</div>
								<Button
									bgcolor="#eb6434"
									onClick={handleRemoveQuestion(questionIndex)}
								>
									Удалить вопрос
								</Button>
							</div>
						))}
					</div>
					<div className="buttons-edit">
						<Link to="/">
							<Button margin="0 20px 0 0">На главную</Button>
						</Link>
						<Button bgcolor="#5cf525" onClick={handleSave}>
							Сохранить
						</Button>
					</div>
				</>
			) : (
				<p>Загрузка...</p>
			)}
		</div>
	);
};

export const TestEdit = styled(TestEditContainer)`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;

	& #checkbox {
		transform: scale(1.3);
		opacity: 0.9;
		cursor: pointer;
		margin: 10px;
	}

	& input {
		padding: 5px;
		border-radius: 10px;
		margin: 0 20px 0 0;
	}

	& .answers & .buttons-edit {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	& .add-answer {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 20px;
	}

	& .add-answer label {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		margin: 10px;
	}

	& .test-edit {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		height: auto;
		padding: 20px;
	}

	& .question {
		margin-bottom: 20px;
		padding: 10px;
		border: 1px solid #ddd;
		border-radius: 5px;
		width: 100%;
	}

	& .question input {
		width: 70%;
	}

	& .answers {
		margin-top: 20px;
		padding-left: 20px;
	}

	& .answer {
		display: flex;
		align-items: center;
		margin-bottom: 10px;
	}

	& .add-answer {
		display: flex;
		flex-direction: column;
		margin-top: 10px;
	}

	& .buttons-edit {
		display: flex;
		margin-top: 20px;
	}
`;
