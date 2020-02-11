import React from 'react'

import Card from '@material-ui/core/Card'
import { Button } from '@material-ui/core';

import { APIQuestion } from '../../interfaces/APIQuestion.interface';
import { decodeHTMLEntities } from '../../libs/HTMLDecoder/HTMLDecoder';
import Answers from '../answers/answers';

interface QuestionProps {
  question?: APIQuestion,
  handleNextButton?: any,
  onChoiceSelection?: any
}

interface QuestionState {
  selectedAnswer?: string;
}

class Question extends React.Component<QuestionProps, QuestionState> {
  constructor(props: any) {
    super(props);

    // Bind the handler methods to this component instance
    this.onChoiceSelect = this.onChoiceSelect.bind(this);
    this.onTextfieldChange = this.onTextfieldChange.bind(this);
  }


  /**
   * Reset the state of this component when we get a new question
   * @param prevProps
   */
  componentDidUpdate(prevProps: any) {
    if (prevProps.question !== this.props.question) {
      this.handleAnswerSelection('');
    }
  }

  /**
   * Called when the user selects an answer
   * @param choice
   */
  onChoiceSelect(choice: string) {
    this.handleAnswerSelection(choice);

  }

  /**
   * Called when the user enters text into the box
   */
  onTextfieldChange(text: string) {
    this.handleAnswerSelection(text);
  }

  handleAnswerSelection(answer: string) {
    // Update state for this component
    this.setState({
      selectedAnswer: answer
    });

    // Pass the selected answer to the parent Quiz component
    this.props.onChoiceSelection(answer);
  }

  /** 
   * Determine if 'next' button should be disabled 
   */
  isButtonDisabled() {
    return !this.state || (this.state && this.state.selectedAnswer!.length === 0);
  }

  render() {
    return (
      <div className="question">
        {this.props.question &&
          <Card className="app-card">
            <div className="app-card__title">
              {decodeHTMLEntities(this.props.question.question)}
            </div>
            <div className="app-card__body">
              <Answers
                questionType={this.props.question.type!}
                correctAnswer={this.props.question.correct_answer!.toString()}
                incorrectAnswers={this.props.question.incorrect_answers!}
                onChoiceSelect={this.onChoiceSelect}
                onTextfieldChange={this.onTextfieldChange}
              >
              </Answers>
            </div>
            <div className="app-card__footer">
              <Button
                disabled={this.isButtonDisabled()}
                variant="contained"
                color="primary"
                onClick={this.props.handleNextButton}
              >
                Next
              </Button>
            </div>
          </Card>
        }
      </div>
    );
  }
}

export default Question;
