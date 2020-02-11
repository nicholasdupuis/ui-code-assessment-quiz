import React from 'react'

import Card from '@material-ui/core/Card'
import { QuizSummary } from '../../interfaces';

interface SummaryProps {
  summary?: QuizSummary
}

interface SummaryState { }

class Summary extends React.Component<SummaryProps, SummaryState> {
  render() {
    return (
      <div>
        <Card className="app-card">
          <div className="app-card__title">
            Summary
          </div>
          <div className="app-card__body">
            <ul>
              <li>
                Correct: {this.props.summary!.correctAnswers}
              </li>
              <li>
                Wrong: {this.props.summary!.incorrectAnswers}
                </li>
              <li>
                Questions answered: {this.props.summary!.questionsAnswered}
              </li>
              <li>
                Final Score: {this.props.summary!.finalScore}%
              </li>
            </ul>
          </div>
        </Card>
      </div>
    );
  }
}

export default Summary;
