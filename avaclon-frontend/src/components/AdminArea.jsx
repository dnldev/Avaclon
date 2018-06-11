import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import strings from '../localization/game-locale';

import { BackendContext, GameContext } from './context';

import ConfigInput from './ConfigInput';

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
      <Paper className={classes.root} elevation={7}>
        <Typography
          className={classes.headline}
          variant="display1"
          gutterBottom
        >
          {strings.adminArea}
        </Typography>
        <BackendContext.Consumer>
          {context => {
            return (
              <React.Fragment>
                <Button
                  className={classes.adminButton}
                  color="primary"
                  disabled={!context.connectedToLobby}
                  variant="raised"
                  onClick={() => context.newGame()}
                >
                  {strings.newGame}
                </Button>

                <Button
                  className={classes.adminButton}
                  color="secondary"
                  disabled={context.connectedToLobby}
                  variant="raised"
                  onClick={() => context.openLobby()}
                >
                  {strings.createLobby}
                </Button>
              </React.Fragment>
            );
          }}
        </BackendContext.Consumer>
        <GameContext.Consumer>
          {context => {
            return (
              <React.Fragment>
                <Button
                  className={classes.adminButton}
                  color="secondary"
                  variant="outlined"
                  onClick={() => context.switchLanguage()}
                >
                  {strings.switchLanguage}
                </Button>

                <ConfigInput />
              </React.Fragment>
            );
          }}
        </GameContext.Consumer>
      </Paper>
    );
  }
}

AdminArea.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminArea);
