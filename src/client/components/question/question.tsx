import React from 'react'

import './question.scss';

import Card from '@material-ui/core/Card'
import { Button } from '@material-ui/core';

import { APIQuestion } from '../../interfaces/APIQuestion.interface';

interface QuestionProps {
    question: APIQuestion
}

interface QuestionState { }

class Question extends React.Component<QuestionProps, QuestionState> {
    constructor(props: any) {
        super(props);
    }

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
                    <div className="app-card__footer">
                        <Button variant="contained" color="primary">
                            Next
                        </Button>
                    </div>
                </Card>
            </div>
        );
    }
}

export default Question;