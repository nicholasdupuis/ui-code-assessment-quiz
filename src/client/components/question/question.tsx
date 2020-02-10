import React from 'react'
import Card from '@material-ui/core/Card'
import { Button } from '@material-ui/core';

import { APIQuestion } from '../../interfaces/APIQuestion.interface';

interface QuestionProps {
    question?: APIQuestion
}

interface QuestionState { }

class Question extends React.Component<QuestionProps, QuestionState> {
    constructor(props: any) {
        super(props);
    }

    /**
     * Removes HTML Entities from strings
     * @param htmlString 
     */
    decodeHTMLEntities(htmlString: string = '') {
        const textArea = document.createElement('textarea');
        textArea.innerHTML = htmlString;
        return textArea.value;
    }

    render() {
        return (
            <div className="question">
                <Card className="app-card">
                    {this.props.question &&
                        <div className="app-card__title">
                            {this.decodeHTMLEntities(this.props.question.question)}
                        </div>
                    }
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