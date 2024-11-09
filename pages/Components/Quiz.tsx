// Quiz.tsx
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { quiz } from '../Data/QuestionSet';
import ScoreCard from './ScoreCard';

interface QuizProps {
	name: string;
}

interface QuizResult {
	score: number;
	correctAnswers: number;
	wrongAnswers: number;
}

const Quiz: React.FC<QuizProps> = ({ name }) => {
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
	const [selectedAnswer, setSelectedAnswer] = useState<string>('');
	const [answerChecked, setAnswerChecked] = useState<boolean>(false);
	const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
	const [showResults, setShowResults] = useState<boolean>(false);
	const [quizResult, setQuizResult] = useState<QuizResult>({
		score: 0,
		correctAnswers: 0,
		wrongAnswers: 0,
	});

	const { questions } = quiz;
	const { question, answers, correctAnswer } = questions[currentQuestionIndex];

	const onAnswerSelected = (answer: string, idx: number) => {
		setSelectedAnswerIndex(idx);
		setSelectedAnswer(answer);
		setAnswerChecked(true);
	};

	const handleNextQuestion = () => {
		if (selectedAnswer === correctAnswer) {
			setQuizResult((prev) => ({
				...prev,
				score: prev.score + 5,
				correctAnswers: prev.correctAnswers + 1,
			}));
		} else {
			setQuizResult((prev) => ({
				...prev,
				wrongAnswers: prev.wrongAnswers + 1,
			}));
		}

		if (currentQuestionIndex !== questions.length - 1) {
			setCurrentQuestionIndex((prev) => prev + 1);
		} else {
			setShowResults(true);
		}

		setSelectedAnswer('');
		setSelectedAnswerIndex(null);
		setAnswerChecked(false);
	};

	return (
		<div className='container mt-5'>
			<div>
				{!showResults ? (
					<div className='card p-4'>
						<h4>{question}</h4>
						<ul className='list-group'>
							{answers.map((answer, idx) => (
								<li
									key={idx}
									onClick={() => onAnswerSelected(answer, idx)}
									className={
										'list-group-item ' +
										(selectedAnswerIndex === idx ? 'active' : '') +
										' cursor-pointer'
									}
								>
									{answer}
								</li>
							))}
						</ul>
						<div className='d-flex justify-content-between mt-3'>
							<b>
								Question {currentQuestionIndex + 1}/{questions.length}
							</b>
							<button
								onClick={handleNextQuestion}
								className='btn btn-primary'
								disabled={!answerChecked}
							>
								{currentQuestionIndex === questions.length - 1 ? 'Submit' : 'Next Question'}
							</button>
						</div>
					</div>
				) : (
					<ScoreCard quizResult={quizResult} questions={questions} name={name} />
				)}
			</div>
		</div>
	);
};

export default Quiz;
