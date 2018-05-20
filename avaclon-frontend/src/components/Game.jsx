import React, { Component } from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import Board from "./Board";

import GameContext from "./game-context";

const styles = theme => ({
  root: {}
});

class Game extends Component {
  state = {
    currentMission: 0,
    voteMarker: 0,
    missionsWon: [],
    playerCount: 10,
  };

  constructor(props) {
    super(props);

    this.state.currentMissionWon = this.currentMissionWon.bind(this);
  }

  currentMissionWon(winner) {
    this.setState(prevState => {
      return { 
        currentMission: prevState.currentMission + 1,
        missionWon: prevState.missionsWon.push(winner)
      }
    })
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <GameContext.Provider value={this.state}>
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
