import React, { Component } from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";

// import Typography from "@material-ui/core/Typography";


import strings from "../localization/game-locale";

import GameContext from "./game-context";

import UserTerminal from "./UserTerminal";

import AdminArea from "./AdminArea";
import Board from "./Board";
import UserControlArea from "./UserControlArea";
import { Hidden, SwipeableDrawer, Button, Paper } from "@material-ui/core";

const styles = theme => ({
  root: {
    margin: theme.spacing.unit,
  },
  button: {
    marginRight: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2,
  },
});

class Game extends Component {
  currentLanguage = "en";

  startingValues = {
    currentMission: 0,
    gameEnded: false,
    playerCount: 10,
    voteMarker: 0,
    wonMissions: [],
  };

  constructor(props) {
    super(props);

    this.state = this.getClonedStartingValues();

    this.state.isAdmin = true;
    this.state.loading = false;
    this.state.terminalOpen = false;

    this.state.currentMissionWon = this.currentMissionWon.bind(this);
    this.state.resetGame = this.resetGame.bind(this);
    this.state.switchLanguage = this.switchLanguage.bind(this);

    this.getClonedStartingValues = this.getClonedStartingValues.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.switchLanguage = this.switchLanguage.bind(this);
    this.toggleUserTerminal = this.toggleUserTerminal.bind(this);
  }


  currentMissionWon(winner) {
    this.setState(prevState => {
      prevState.wonMissions.push(winner);
      return {
        currentMission: prevState.currentMission + 1,
        gameEnded: this.hasGameEnded(prevState.wonMissions),
        wonMissions: prevState.wonMissions
      }
    })
  }

  getClonedStartingValues() {
    return JSON.parse(JSON.stringify(this.startingValues)); // clone object
  }

  // TODO: socket.io back-end check
  hasGameEnded(wonMissions) {
    return ((wonMissions.filter(el => el === "evil")).length === 3
      || (wonMissions.filter(el => el === "good")).length === 3);
  }

  resetGame() {
    this.setState(this.getClonedStartingValues());
  }

  switchLanguage() {
    this.currentLanguage = this.currentLanguage === "en" ? "de" : "en";
    strings.setLanguage(this.currentLanguage);
    this.setState({});
  }

  toggleUserTerminal(open) {
    this.setState({ terminalOpen: open });
  }

  render() {
    const { classes } = this.props;
    const player = {
      name: "Josh",
      role: {
        affiliation: "evil",
        image: "genred",
        name: "Generic Red",
      }
    };

    if (!this.state.loading) {
      return (
        <div className={classes.root}>
          <GameContext.Provider value={this.state}>
            {this.state.isAdmin ? <AdminArea /> : <UserControlArea />}

            <Board />
            <Hidden only={['xs', 'sm', 'md']}>
              <UserTerminal player={player} />
            </Hidden>
            <Hidden only={['lg', 'xl']}>
              <Button onClick={() => this.toggleUserTerminal(true)}>Open</Button>
              <SwipeableDrawer
                anchor="bottom"
                onClose={() => this.toggleUserTerminal(false)}
                onOpen={() => this.toggleUserTerminal(true)}
                open={this.state.terminalOpen}
              >
                <UserTerminal player={player} />
              </SwipeableDrawer>
            </Hidden>
          </GameContext.Provider>
        </div>
      );
    }
  }
}

Game.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Game);
