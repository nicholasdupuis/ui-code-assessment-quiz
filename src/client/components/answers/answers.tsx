import React, { ReactNode } from 'react';
import { Radio, RadioGroup, FormControlLabel, FormControl, TextField } from '@material-ui/core';

import { decodeHTMLEntities } from '../../libs/HTMLDecoder/HTMLDecoder';

// TODO: maybe pass choices as a single array rather than pass both incorrect and correct answers
interface AnswersProps {
  questionType?: string,
  correctAnswer?: string,
  incorrectAnswers?: string[],
  onChoiceSelect?: any,
  onTextfieldChange?: any
}

interface AnswersState {
  choices: any[]
}

class Answers extends React.Component<AnswersProps, AnswersState> {

  /**
   * Update the choices displayed when a new question comes up
   * @param prevProps 
   */
  componentDidUpdate(prevProps: any): void {
    if (prevProps.correctAnswer !== this.props.correctAnswer) {
      this.setChoices();
    }
  }

  componentDidMount(): void {
    this.setChoices();
  }

  /** 
   * Sets up the choices for the current question
   */
  setChoices(): void {
    let choices: string[] = [];

    switch (this.props.questionType) {
      case 'multiple':
        // Create and shuffle array with both correct and incorrect answers
        choices = this.props.incorrectAnswers!;
        choices.push(this.props.correctAnswer!);
        choices.sort((a, b) => {
          return 0.5 - Math.random();
        });

        break;
      case 'boolean':
        choices = ['True', 'False']

        break;
      default:
        // Do nothing for 'text' or any other type, array is already empty

        break;
    }

    this.setState({
      choices: choices
    });
  }

  render(): ReactNode {
    return (
      <div>
        {this.props.questionType !== 'text' &&
          <FormControl component="fieldset">
            <RadioGroup aria-label="choices" name="choices" onChange={e => { this.props.onChoiceSelect(e.currentTarget.value) }}>
              {this.state && this.state.choices.map(choice => {
                return (
                  <FormControlLabel key={choice} value={choice} control={<Radio />} label={decodeHTMLEntities(choice)} />
                );
              })}
            </RadioGroup>
          </FormControl>
        }
        {this.props.questionType === 'text' &&
          <TextField id="outlined-basic" label="Enter your answer here" variant="outlined" onChange={e => { this.props.onTextfieldChange(e.currentTarget.value) }} />
        }
      </div>
    )
  }
}

export default Answers;
