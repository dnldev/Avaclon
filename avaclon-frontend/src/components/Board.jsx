import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';

import Mission from './Mission';
import VoteStepper from './VoteStepper';

import GameContext from './game-context';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
});

class Board extends Component {
  missionPlayersForPlayerCount = {
    5: [2, 3, 2, 3, 3],
    6: [2, 3, 4, 3, 4],
    7: [2, 3, 3, 4, 4],
    8: [3, 4, 4, 5, 5],
    9: [3, 4, 4, 5, 5],
    10: [3, 4, 4, 5, 5],
  };

  render() {
    const { classes } = this.props;

    return (
      <GameContext.Consumer>
        {context => {
          return (
            <Paper className={classes.root} elevation={5}>
              {this.missionPlayersForPlayerCount[context.playerCount].map(
                (missionPlayers, i) => {
                  return (
                    <Mission
                      key={i}
                      missionIndex={i}
                      currentMission={context.currentMission}
                      playersOnMission={missionPlayers}
                      wonBy={context.wonMissions[i]}
                    />
                  );
                }
              )}

              <VoteStepper />
            </Paper>
          );
        }}
      </GameContext.Consumer>
    );
  }
}

Board.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Board);
