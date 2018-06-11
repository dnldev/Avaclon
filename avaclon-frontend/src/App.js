import React, { Component } from 'react';

import { createMuiTheme } from '@material-ui/core/styles';
import { MuiThemeProvider } from '@material-ui/core';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import BackendProvider from './components/BackendProvider';
import Game from './components/Game';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#FFECB3',
      main: '#FFC107',
      dark: '#FFA000',
      contrastText: '#212121',
    },
    secondary: {
      light: '#CFD8DC',
      main: '#607D8B',
      dark: '#455A64',
      contrastText: '#FFFFFF',
    },
    teams: {
      good: '#336ba8',
      evil: '#b65964',
    },
  },
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="title" color="inherit">
              Avaclon
            </Typography>
          </Toolbar>
        </AppBar>
        {/* other components */}
        <BackendProvider>
          <Game />
        </BackendProvider>
      </MuiThemeProvider>
    );
  }
}

export default App;
