import mongoose from 'mongoose';

export const QuestionSchema = new mongoose.Schema({
	title: String,
	answers: [{ text: String, isCorrect: Boolean }],
});
