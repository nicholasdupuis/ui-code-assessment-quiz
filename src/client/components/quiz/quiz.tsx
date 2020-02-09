import React from 'react'

import appConfig from '../AppConfig.json'

// TODO: Is there a way to simplify these imports, similar to Angular's index.ts? 
import Question from '../question/question';
import Summary from '../summary/summary';

interface QuizProps {
    // None
}

interface QuizState {
    showSummary?: boolean
}

class Quiz extends React.Component<QuizProps, QuizState> {

    constructor(props: any) {
        super(props);

        this.state = {showSummary: false}
    }

    componentDidMount() {
        console.log('hello world');
        console.log(appConfig.apiUrl)
    }

    render() {
        return (
            <div>
                <Question></Question>
                {this.state.showSummary &&
                    <Summary></Summary>
                }
            </div>
        );
    }
}

export default Quiz;