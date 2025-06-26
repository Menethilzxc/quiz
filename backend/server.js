import express from 'express';
import mongoose from 'mongoose';
import chalk from 'chalk';
import cors from 'cors';
import dotenv from 'dotenv';
import { QuestionSchema } from './models/Question.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(process.env.MONGO_URL);

const Question = mongoose.model('Question', QuestionSchema, 'questions');

app.get('/questions', async (req, res) => {
	try {
		const questions = await Question.find();
		console.log(questions);
		res.json(questions);
	} catch (error) {
		console.error('ошибка при получении вопросов: ', error);
		res.status(500).json({ message: 'Ошибка сервера' });
	}
});

app.put('/questions', async (req, res) => {
	try {
		const updatedQuestions = req.body;

		for (const question of updatedQuestions) {
			await Question.findByIdAndUpdate(question._id, question, { new: true });
		}

		res.json({ success: true, message: 'Тест обновлён' });
	} catch (error) {
		console.error('Ошибка обновления вопросов: ', error);
		res.status(500).json({ success: false, message: 'Ошибка сервера' });
	}
});

app.listen(5000, () => console.log(chalk.bgGreen('Server started on port 5000')));
