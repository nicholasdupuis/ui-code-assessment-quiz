import React, { ReactNode } from 'react'
import { Card, Button, LinearProgress } from '@material-ui/core';

import './quiz.scss';

import appConfig from '../../AppConfig.json'
// TODO: Is there a way to barrel component imports?
import Question from '../question/question';
import Summary from '../summary/summary';
import { APIQuestion, QuizSummary } from '../../interfaces';

interface QuizProps { }

interface QuizState {
  isLoading?: boolean,
  questions?: APIQuestion[],
  usedQuestions?: APIQuestion[],
  currentQuestion?: APIQuestion,
  quizSummary?: QuizSummary
  percentComplete?: number,
  selectedAnswer?: string
}

class Quiz extends React.Component<QuizProps, QuizState> {

  constructor(props: any) {
    super(props);

    // Initialize state of component
    this.state = {
      isLoading: true,
      usedQuestions: [],
      quizSummary: {
        correctAnswers: 0,
        incorrectAnswers: 0,
        questionsAnswered: 0,
        finalScore: 0
      },
      percentComplete: 0
    }

    // Bind handler methods to this component instance
    this.handleNextButton = this.handleNextButton.bind(this);
    this.setSelectedAnswer = this.setSelectedAnswer.bind(this);
  }

  componentDidMount(): void {
    fetch(appConfig.apiUrl + '/questions')
      .then(res => res.json())
      .then(res => {
        this.setState({
          isLoading: false,
          questions: res.results,
        }, () => {
          this.setState({
            currentQuestion: this.getRandomQuestion()
          })
        });
      })
  }

  /**
   * Given an array of questions, pull a random element from the array
   * @param questions 
   */
  getRandomQuestion(): APIQuestion {
    // Get a random question array index 
    const randomQuestionIndex = Math.floor(Math.random() * this.state.questions!.length);

    // remove from array
    const question: APIQuestion = this.state.questions!.splice(randomQuestionIndex, 1)[0];

    // store in used questions array
    this.state.usedQuestions!.push(question);

    // update the component state
    this.setState({
      questions: this.state.questions!,
      usedQuestions: this.state.usedQuestions!
    })

    // return question
    return question;
  }

  /**
   * Called by child Question component when an answer is selected
   */
  setSelectedAnswer(answer: string): void {
    this.setState({
      selectedAnswer: answer
    });
  }

  /**
   * Called after the next button is clicked, calculates the current summary information
   */
  getUpdatedSummary(): QuizSummary {
    const currentSummary: QuizSummary = { ...this.state.quizSummary };
    const isCorrect: boolean = this.state.selectedAnswer!.toLowerCase() === this.state.currentQuestion!.correct_answer!.toString().toLowerCase();

    isCorrect ? currentSummary.correctAnswers!++ : currentSummary.incorrectAnswers!++;
    currentSummary.questionsAnswered!++;
    currentSummary.finalScore = Math.floor((currentSummary.correctAnswers! / currentSummary.questionsAnswered!) * 100);

    return currentSummary;
  }

  /**
   * Called when user clicks the "Next" button
   */
  handleNextButton(): void {
    const questionsAnswered = this.state.quizSummary!.questionsAnswered! + 1;
    const updatedSummary = this.getUpdatedSummary();

    this.setState({
      percentComplete: (questionsAnswered / appConfig.questionsToAnswer) * 100,
      currentQuestion: this.getRandomQuestion(),
      quizSummary: updatedSummary
    });
  }

  /**
   * Show the summary screen when the quiz is finished
   */
  isFinished(): boolean {
    return this.state.quizSummary!.questionsAnswered === appConfig.questionsToAnswer;
  }

  /**
   * Resets the quiz so the user can try again
   */
  reset(): void {
    this.setState({
      currentQuestion: this.getRandomQuestion(),
      quizSummary: {
        correctAnswers: 0,
        incorrectAnswers: 0,
        questionsAnswered: 0,
        finalScore: 0
      },
      questions: [...this.state.questions!, ...this.state.usedQuestions!],
      usedQuestions: [],
      percentComplete: 0,
      selectedAnswer: ''
    });
  }

  render(): ReactNode {
    return (
      <div>
        <Card className="app-card">
          <div className="app-card__body">
            <div className="progress-indicator--text">Questions answered: {this.state.quizSummary!.questionsAnswered}/{appConfig.questionsToAnswer} </div>
            <LinearProgress variant="determinate" value={this.state.percentComplete} />
          </div>
        </Card>
        {!this.isFinished() && !this.state.isLoading && this.state.currentQuestion &&
          <Question
            question={this.state.currentQuestion}
            onChoiceSelection={this.setSelectedAnswer}
            handleNextButton={this.handleNextButton}>
          </Question>
        }
        {this.isFinished() &&
          <div className="quiz-summary">
            <Summary summary={this.state.quizSummary}></Summary>
            <Button variant="contained" color="primary" onClick={e => { this.reset() }}> Reset </Button>
          </div>
        }
      </div>
    );
  }
}

export default Quiz;
