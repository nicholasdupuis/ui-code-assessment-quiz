import React from 'react'

import appConfig from '../../AppConfig.json'

import LinearProgress from '@material-ui/core/LinearProgress';

// TODO: Is there a way to barrel component imports? 
import Question from '../question/question';
import Summary from '../summary/summary';
import { APIQuestion, QuizSummary } from '../../interfaces';
import { Card } from '@material-ui/core';

interface QuizProps { }

interface QuizState {
  isLoading?: boolean,
  showSummary?: boolean,
  questions?: APIQuestion[],
  currentQuestion?: APIQuestion,
  quizSummary?: QuizSummary
  questionsAnswered?: number,
  percentComplete?: number,
  selectedAnswer?: string
}

class Quiz extends React.Component<QuizProps, QuizState> {

  constructor(props: any) {
    super(props);

    this.state = {
      isLoading: true,
      quizSummary: {
        correctAnswers: 0,
        incorrectAnswers: 0,
        questionsAnswered: 0,
        finalScore: 0
      },
      questionsAnswered: 0,
      percentComplete: 0
    }

    this.handleNextButton = this.handleNextButton.bind(this);
    this.setSelectedAnswer = this.setSelectedAnswer.bind(this);
  }

  /**
   * Given an array of questions, pull a random element from the array
   * @param questions 
   */
  getRandomQuestion(questions: APIQuestion[]) {
    return questions[Math.floor(Math.random() * questions.length)];
  }

  /**
   * Called by child Question component when an answer is selected
   */
  setSelectedAnswer(answer: string) {
    this.setState({
      selectedAnswer: answer
    });
  }

  /**
   * Called after the next button is clicked, calculates the current summary information
   */
  getUpdatedSummary(): QuizSummary {
    const currentSummary: QuizSummary = {...this.state.quizSummary};
    const isCorrect: boolean = this.state.selectedAnswer!.toLowerCase() === this.state.currentQuestion!.correct_answer!.toString().toLowerCase();
    
    if (isCorrect) {
      currentSummary.correctAnswers!++;
    } else {
      currentSummary.incorrectAnswers!++;
    }
    
    currentSummary.questionsAnswered!++;
    currentSummary.finalScore = Math.floor((currentSummary.correctAnswers! / currentSummary.questionsAnswered!) * 100);

    return currentSummary;
  }

  /**
   * Called when user clicks the "Next" button
   */
  handleNextButton() {
    const questionsAnswered = this.state.questionsAnswered! + 1;
    const updatedSummary = this.getUpdatedSummary();

    this.setState({
        questionsAnswered: questionsAnswered,
        percentComplete: (questionsAnswered / appConfig.questionsToAnswer) * 100,
        currentQuestion: this.getRandomQuestion(this.state.questions!),
        quizSummary: updatedSummary
      });
  }

  componentDidMount() {
    fetch(appConfig.apiUrl + '/questions')
      .then(res => res.json())
      .then(res => {
        // Get an initial question at random from the array
        const initialQuestion = this.getRandomQuestion(res.results);

        this.setState({
          isLoading: false,
          questions: res.results,
          currentQuestion: initialQuestion
        });
      })
  }

  /**
   * Show the summary screen when the quiz is finished
   */
  isFinished(): boolean {
    return this.state.questionsAnswered === appConfig.questionsToAnswer;
  }

  render() {
    return (
      <div>
        <Card className="app-card">
          <div className="app-card__body">
            <div>Questions answered: {this.state.questionsAnswered}/{appConfig.questionsToAnswer} </div>
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
          <Summary summary={this.state.quizSummary}></Summary>
        }
      </div>
    );
  }
}

export default Quiz;
