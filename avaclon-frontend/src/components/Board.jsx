import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import strings from '../localization/game-locale';

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

  twoFailsNeeded(playerCount, questIndex) {
    return playerCount >= 7 && questIndex === 3;
  }

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
                            currentQuest={context.currentQuest}
                            playersOnQuest={questPlayers}
                            questIndex={i}
                            wonBy={context.wonQuests[i]}
                          />
                        </Grid>
                        {this.twoFailsNeeded(context.playerCount, i) && (
                          <Typography
                            align="center"
                            gutterBottom
                            variant="caption"
                          >
                            {strings.fourthMissionCaption}
                          </Typography>
                        )}
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
