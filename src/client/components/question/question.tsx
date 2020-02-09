import React from 'react'

import './question.scss';

import Card from '@material-ui/core/Card'

class Question extends React.Component {
    render() {
        return (
            <div className="question">
                <Card className="app-card">
                    <div className="app-card__title">
                        Here is a question
                    </div>
                    <div className="app-card__body">
                        Answer
                    </div>
                </Card>
            </div>
        );
    }
}

export default Question;