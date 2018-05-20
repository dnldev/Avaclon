import React, { Component } from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";

// import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import Board from "./Board";

import strings from "../localization/game-locale";

import GameContext from "./game-context";

const styles = theme => ({
  root: {
    margin: theme.spacing.unit
  },
  button: {
    margin: theme.spacing.unit * 2
  }
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

    this.state.currentMissionWon = this.currentMissionWon.bind(this);

    this.getClonedStartingValues = this.getClonedStartingValues.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.switchLanguage = this.switchLanguage.bind(this);
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

  render() {
    const { classes } = this.props;
    
    return (
      <div className={classes.root}>
        <GameContext.Provider value={this.state}>
          <Button className={classes.button} variant="raised" color="primary" onClick={() => this.resetGame()}>
            {strings.newGame}
          </Button>
          <Button className={classes.button} variant="raised" color="primary" onClick={() => this.switchLanguage()}>
            {strings.switchLanguage}
          </Button>
          <Board />
        </GameContext.Provider>
      </div>
    );
  }
}

Game.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Game);
