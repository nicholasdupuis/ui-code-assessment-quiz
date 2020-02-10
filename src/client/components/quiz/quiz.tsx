import React from 'react'

import appConfig from '../AppConfig.json'

// TODO: Is there a way to simplify these imports, similar to Angular's index.ts?
import Question from '../question/question';
import Summary from '../summary/summary';
import { APIQuestion } from '../../interfaces/APIQuestion.interface';
import { QuizSummary } from '../../interfaces/QuizSummary.interface';

interface QuizProps { }

interface QuizState {
    isLoading?: boolean,
    showSummary?: boolean,
    questions?: APIQuestion[],
    currentQuestion?: APIQuestion,
    quizSummary?: QuizSummary
}

class Quiz extends React.Component<QuizProps, QuizState> {

    constructor(props: any) {
        super(props);

        this.state = { 
            isLoading: true,
            showSummary: false,
            quizSummary: {}
        }
    }

    getRandomQuestion(questions: APIQuestion[]) {
        return questions[Math.floor(Math.random() * questions.length)];
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

    render() {
        return (
            <div>
                {!this.state.isLoading &&
                    <Question question={this.state.currentQuestion}></Question>
                }
                {this.state.showSummary &&
                    <Summary></Summary>
                }
            </div>
        );
    }
}

export default Quiz;