import * as React from 'react';

import Quiz from './components/quiz/quiz'

import { AppBar, Toolbar, Typography, Container } from '@material-ui/core';

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
