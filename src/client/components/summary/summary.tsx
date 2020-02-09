import React from 'react'

import Card from '@material-ui/core/Card'

class Summary extends React.Component {
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
                                Correct: 2
                            </li>
                            <li>
                                Wrong: 1
                            </li>
                            <li>
                                Questions answered: 3
                            </li>
                            <li>
                                Final Score: 70%
                            </li>
                        </ul>
                    </div>
                </Card>
            </div>
        );
    }
}

export default Summary;