import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import strings from '../localization/game-locale';

import { BackendContext, GameContext } from './context';

import ConfigInput from './ConfigInput';

const styles = theme => ({
  root: {
    paddingBottom: '2em',
  },
  userButton: {
    marginTop: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit,
  },
});

class AdminArea extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root} elevation={1}>
        <BackendContext.Consumer>
          {context => {
            return (
              <Button
                className={classes.userButton}
                color="primary"
                disabled={context.isPlayerReady}
                variant="raised"
                onClick={context.playerReady}
              >
                {strings.playerReady}
              </Button>
            );
          }}
        </BackendContext.Consumer>
        <GameContext.Consumer>
          {context => {
            return (
              <Button
                className={classes.userButton}
                color="secondary"
                variant="outlined"
                onClick={context.switchLanguage}
              >
                {strings.switchLanguage}
              </Button>
            );
          }}
        </GameContext.Consumer>
        <ConfigInput />
      </Paper>
    );
  }
}

AdminArea.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminArea);
