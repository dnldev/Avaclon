import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import strings from '../localization/game-locale';

import GameContext from './game-context';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.secondary.light,
  },
  adminButton: {
    margin: theme.spacing.unit * 2,
    marginRight: 0,
  },
  headline: {
    margin: theme.spacing.unit * 2,
    paddingTop: theme.spacing.unit,
  },
});

class AdminArea extends Component {
  render() {
    const { classes } = this.props;

    return (
      <GameContext.Consumer>
        {context => {
          return (
            <Paper className={classes.root} elevation={7}>
              <Typography
                className={classes.headline}
                variant="display1"
                gutterBottom
              >
                {strings.adminArea}
              </Typography>

              <Button
                className={classes.adminButton}
                color="secondary"
                variant="raised"
                onClick={() => context.resetGame()}
              >
                {strings.newGame}
              </Button>
              <Button
                className={classes.adminButton}
                color="secondary"
                variant="outlined"
                onClick={() => context.switchLanguage()}
              >
                {strings.switchLanguage}
              </Button>
              <Button
                className={classes.adminButton}
                color="secondary"
                variant="outlined"
                onClick={() => context.openLobby()}
              >
                {strings.connect}
              </Button>
            </Paper>
          );
        }}
      </GameContext.Consumer>
    );
  }
}

AdminArea.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminArea);
