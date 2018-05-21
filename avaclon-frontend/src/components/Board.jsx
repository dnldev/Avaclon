import React, { Component } from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import Mission from "./Mission";

import GameContext from "./game-context";

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
  buttonContainer: {
    marginTop: theme.spacing.unit
  },
  headline: {
    marginBottom: theme.spacing.unit
  }
});

class Board extends Component {
  missionPlayersForPlayerCount = {5: [2, 3, 2, 3, 3], 6: [2, 3, 4, 3, 4], 7: [2, 3, 3, 4, 4], 8: [3, 4, 4, 5, 5], 
                                  9: [3, 4, 4, 5, 5], 10: [3, 4, 4, 5, 5]};

  render() {
    const { classes } = this.props;

    return (
        <GameContext.Consumer>
          {(context) => {
            return (
              <Paper className={classes.root} elevation={5}>
                <Typography className={classes.headline} variant="headline" component="h3">
                  Current Mission: {context.currentMission + 1}
                </Typography>

                {this.missionPlayersForPlayerCount[context.playerCount]
                    .map((missionPlayers, i) => {
                      return (<Mission key={i} missionIndex={i} currentMission={context.currentMission}
                              playersOnMission={missionPlayers} wonBy={context.wonMissions[i]}/>)
                    })
                }
                <Divider />
                <div className={classes.buttonContainer}>
                  <Button disabled={context.gameEnded} size="small" onClick={() => context.currentMissionWon("evil")}>
                    redWin
                  </Button>
                  <Button disabled={context.gameEnded} size="small" onClick={() => context.currentMissionWon("good")}>
                    blueWin
                  </Button>
                </div>
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
