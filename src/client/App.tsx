import * as React from 'react';

import Quiz from './components/quiz/quiz'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

export const App = () => (
    <div>
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6">
                    Lucid Quiz
            </Typography>
            </Toolbar>
        </AppBar>
        <Container>
            <Quiz></Quiz>
        </Container>
    </div>

);
