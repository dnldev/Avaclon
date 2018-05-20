import React, { Component } from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import Mission from "./Mission";

import GameContext from "./game-context";

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  })
});

class Board extends Component {
  missionsPlayerDict = {5: [2, 3, 2, 3, 3], 6: [2, 3, 4, 3, 4], 7: [2, 3, 3, 4, 4], 8: [3, 4, 4, 5, 5], 
                        9: [3, 4, 4, 5, 5], 10: [3, 4, 4, 5, 5]};

  render() {
    const { classes } = this.props;

    return (
        <GameContext.Consumer>
          {(context) => {
            return (
              <Paper className={classes.root} elevation={10}>
                <Typography component="p">
                  Current Mission: {context.currentMission}
                </Typography>

                {this.missionsPlayerDict[context.playerCount].map((missionPlayers, i) => {
                  return (<Mission key={i} currentMission={context.currentMission} missionIndex={i}
                          playersOnMission={missionPlayers} wonBy={context.missionsWon[i]}/>)
                })}
                <br/>
                <Button size="small" className={classes.button} onClick={() => context.currentMissionWon("evil")}>
                  redWin
                </Button>
                <Button size="small" className={classes.button} onClick={() => context.currentMissionWon("good")}>
                  blueWin
                </Button>
              </Paper>
            )
          }}
        </GameContext.Consumer>
    );
  }
}

Board.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Board);
