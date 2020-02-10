import React from 'react'

import appConfig from '../../AppConfig.json'

// TODO: Is there a way to barrel component imports? 
import Question from '../question/question';
import Summary from '../summary/summary';
import { APIQuestion, QuizSummary } from '../../interfaces';

interface QuizProps { }

interface QuizState {
  isLoading?: boolean,
  showSummary?: boolean,
  questions?: APIQuestion[],
  currentQuestion?: APIQuestion,
  quizSummary?: QuizSummary
  quizPosition?: number
}

class Quiz extends React.Component<QuizProps, QuizState> {

  constructor(props: any) {
    super(props);

    this.state = {
      isLoading: true,
      quizSummary: {},
      quizPosition: 0
    }

    this.handleNextButton = this.handleNextButton.bind(this);
  }

  /**
   * Given an array of questions, pull a random element from the array
   * @param questions 
   */
  getRandomQuestion(questions: APIQuestion[]) {
    return questions[Math.floor(Math.random() * questions.length)];
  }

  handleNextButton() {
    this.setState({
      quizPosition: this.state.quizPosition! + 1,
      currentQuestion: this.getRandomQuestion(this.state.questions!)
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
    return this.state.quizPosition === appConfig.questionsToAnswer;
  }

  render() {
    return (
      <div>
        <div>Questions answered: {this.state.quizPosition}/{appConfig.questionsToAnswer}</div>
        {!this.isFinished() && !this.state.isLoading && this.state.currentQuestion &&
          <Question
            question={this.state.currentQuestion}
            handleNextButton={this.handleNextButton}>
          </Question>
        }
        {this.isFinished() &&
          <Summary></Summary>
        }
      </div>
    );
  }
}

export default Quiz;
