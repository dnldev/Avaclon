import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Quest from './Quest';
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
  questPlayersForPlayerCount = {
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
              <Grid container className={classes.quest} justify="center">
                {this.questPlayersForPlayerCount[context.playerCount].map(
                  (questPlayers, i) => {
                    return (
                      <Grid item key={i} xs={4} md={2}>
                        <Grid container justify="center">
                            <Quest
                              questIndex={i}
                              currentQuest={context.currentQuest}
                              playersOnQuest={questPlayers}
                              wonBy={context.wonQuests[i]}
                            />
                        </Grid>
                      </Grid>
                    );
                  }
                )}
              </Grid>
        
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
