import React, { Component } from "react";

import { createMuiTheme } from "@material-ui/core/styles";
import { MuiThemeProvider } from "@material-ui/core";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import Game from "./components/Game";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#fff263",
      main: "#fbc02d",
      dark: "#c49000",
      contrastText: "#000",
    },
    secondary: {
      light: "#ffffff",
      main: "#ced7db",
      dark: "#9da6a9",
      contrastText: "#000",
    }
  },
});

class App extends Component {
  componentDidMount() {
    document.title = "Avaclon";
  }

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
        <Game />
      </MuiThemeProvider>
    );
  }
}

export default App;
