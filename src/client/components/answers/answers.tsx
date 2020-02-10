import React from 'react';

interface AnswersProps {
    questionType: string,
    correctAnswer: string,
    incorrectAnswers: string[]
}

interface AnswersState {
    answers: any[]
}

class Answers extends React.Component<AnswersProps, AnswersState> {

    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        switch (this.props.questionType) {
            case 'multiple':
                // Create and shuffle array with both correct and incorrect answers
                const answers = this.props.incorrectAnswers;
                answers.push(this.props.correctAnswer);
                answers.sort((a, b) => {
                    return 0.5 - Math.random();
                });

                this.setState({
                    answers: this.props.incorrectAnswers || []
                });
                break;
            case 'boolean':
                this.setState({
                    answers: ['true', 'false']
                })
                break;
            case 'text':
                this.setState({
                    answers: []
                });
                break;
        }
    }

    render() {
        return (
            <div>
                {this.state && this.state.answers}
            </div>
        )
    }
}

export default Answers;