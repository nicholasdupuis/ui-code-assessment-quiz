import React from 'react'

import appConfig from '../AppConfig.json'

// TODO: Is there a way to simplify these imports, similar to Angular's index.ts?
import Question from '../question/question';
import Summary from '../summary/summary';
import { APIQuestion } from '../../interfaces/APIQuestion.interface';

interface QuizProps { }

interface QuizState {
    showSummary?: boolean
    questions?: APIQuestion[],
    currentQuestion?: APIQuestion,
}

class Quiz extends React.Component<QuizProps, QuizState> {

    constructor(props: any) {
        super(props);

        this.state = { 
            showSummary: true,
        }
    }

    componentDidMount() {
        fetch(appConfig.apiUrl + '/questions')
            .then(res => res.json())
            .then(res => {
                console.log(res);
                this.setState({
                    questions: res.results
                });
            })
    }

    render() {
        return (
            <div>
                {this.state.showSummary &&
                    <Summary></Summary>
                }
            </div>
        );
    }
}

export default Quiz;