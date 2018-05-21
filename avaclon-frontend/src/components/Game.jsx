import React, { Component } from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";

// import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import Board from "./Board";

import GameContext from "./game-context";
import Player from "./Player";

const styles = theme => ({
  root: {
    margin: theme.spacing.unit
  },
  newGameButton: {
    marginTop: theme.spacing.unit * 2
  }
});

class Game extends Component {
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

    this.state.currentMissionWon = this.currentMissionWon.bind(this);

    this.getClonedStartingValues = this.getClonedStartingValues.bind(this);
    this.resetGame = this.resetGame.bind(this);
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

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <GameContext.Provider value={this.state}>
          <Button className={classes.newGameButton} variant="raised" color="primary" onClick={() => this.resetGame()}>
            New Game
          </Button>
          <Board />
          <Player player={{
            name: "Josh",
            role: {
              affiliation: "good",
              image: "genblue",
              name: "Generic Blue",
            }
          }}/>
        </GameContext.Provider>
      </div>
    );
  }
}

Game.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Game);
