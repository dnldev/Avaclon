import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import strings from '../localization/game-locale';

import Quest from './Quest';
import VoteStepper from './VoteStepper';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
});

class Board extends Component {
  constructor(props) {
    super(props);

    this.questPlayersForPlayerCount = {};
  }

  twoFailsNeeded(playerCount, questIndex) {
    return playerCount >= 7 && questIndex === 3;
  }

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root} elevation={5}>
        <Grid container className={classes.quest} justify="center">
          {this.props.questPlayerCounts.map((questPlayers, i) => {
            return (
              <Grid item key={i} xs={4} md={2}>
                <Grid container justify="center">
                  <Quest
                    currentQuest={this.props.currentQuest}
                    playersOnQuest={questPlayers}
                    questIndex={i}
                    wonBy={this.props.wonQuests[i]}
                  />
                </Grid>
                {this.twoFailsNeeded(this.props.playerCount, i) && (
                  <Typography align="center" gutterBottom variant="caption">
                    {this.props.currentQuest === 3 ? (
                      <strong>{strings.fourthMissionCaption}</strong>
                    ) : (
                      strings.fourthMissionCaption
                    )}
                  </Typography>
                )}
              </Grid>
            );
          })}
        </Grid>

        <VoteStepper />
      </Paper>
    );
  }
}

Board.propTypes = {
  classes: PropTypes.object.isRequired,
  currentQuest: PropTypes.number.isRequired,
  playerCount: PropTypes.number.isRequired,
  questPlayerCounts: PropTypes.array.isRequired,
  wonQuests: PropTypes.array.isRequired,
};

export default withStyles(styles)(Board);
