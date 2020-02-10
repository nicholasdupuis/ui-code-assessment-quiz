import React from 'react';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

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

  // Update the choices when component receives a new question prop
  componentDidUpdate(prevProps: any) {
    if (prevProps.correctAnswer !== this.props.correctAnswer) {
      this.setChoices();
    }
  }

  componentDidMount() {
    this.setChoices();
  }

  /** 
   * Set up the choices for the current question
   */
  setChoices() {
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
      case 'text':
        // Do nothing, array is empty already

        break;
      default:
        // Do nothing, array is empty already

        break;
    }

    this.setState({
      choices: choices
    });
  }

  render() {
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
