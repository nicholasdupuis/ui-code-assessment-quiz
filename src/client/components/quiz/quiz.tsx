import React from 'react'

// TODO: Is there a way to simplify these imports, similar to Angular's index.ts? 
import Question from '../question/question';
import Summary from '../summary/summary';

class Quiz extends React.Component {
    render() {
        return (
            <div>
                <Question></Question>
                <Summary></Summary>
            </div>
        );
    }
}

export default Quiz;