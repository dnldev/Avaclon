import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import { Grid, CircularProgress } from '@material-ui/core';

import strings from '../localization/game-locale';

import { BackendContext, GameContext } from './context';

import AdminArea from './AdminArea';
import GameUI from './GameUI';
import UserControlArea from './UserControlArea';

const styles = theme => ({
  root: {
    margin: theme.spacing.unit,
  },
  button: {
    marginRight: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2,
  },
  // add style to center loading
  loading: {
    margin: 'auto auto auto auto',
  },
  mainGrid: {
    [theme.breakpoints.up('md')]: {
      alignContent: 'space-between',
      height: 'calc(100vh - 64px - ' + theme.spacing.unit * 2 + 'px)',
    },
  },
  toggleTerminalButton: {
    bottom: theme.spacing.unit,
    height: theme.spacing.unit * 4,
    position: 'fixed',
    width: 'calc(100% - ' + theme.spacing.unit * 2 + 'px)',
  },
  userTerminalArea: {
    marginTop: theme.spacing.unit * 2,
  },
});

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = { currentLanguage: 'en', hideRole: true };

    this.state.isAdmin = true;
    this.state.loading = false;
    this.state.terminalOpen = false;
    this.state.progress = (1 / 5) * 100;

    this.state.calculateProgress = this.calculateProgress.bind(this);
    this.state.switchLanguage = this.switchLanguage.bind(this);
    this.state.toggleRoleConcealment = this.toggleRoleConcealment.bind(this);
  }

  calculateProgress({ playerCount, players }) {
    return (1 / playerCount) * players.length * 100;
  }

  getClonedObject(object) {
    return JSON.parse(JSON.stringify(object));
  }

  switchLanguage() {
    let newLanguage = this.state.currentLanguage === 'en' ? 'de' : 'en';
    strings.setLanguage(newLanguage);
    this.setState({ currentLanguage: newLanguage });
  }

  toggleRoleConcealment() {
    this.setState(prevState => {
      return { hideRole: !prevState.hideRole };
    });
  }

  render() {
    const { classes } = this.props;

    const STATIC_PROGRESS_BOUNDARY = 80;

    return (
      <BackendContext.Consumer>
        {context =>
          // TODO: tidy up and replace context use
          context.loading ? (
            <CircularProgress
              className={classes.loading}
              variant={
                context.progress >= STATIC_PROGRESS_BOUNDARY
                  ? 'indeterminate'
                  : 'static'
              }
              value={context.progress}
              size={100}
              color="secondary"
            />
          ) : (
            <div className={classes.root}>
              <GameContext.Provider value={this.state}>
                <Grid container className={classes.mainGrid} justify="center">
                  <Grid item xs={12}>
                    {context.gameStarted ? (
                      <GameUI players={context.players} />
                    ) : context.gameSetUp ? (
                      <UserControlArea />
                    ) : (
                      // not started nor set up
                      <AdminArea />
                    )}
                  </Grid>
                </Grid>
              </GameContext.Provider>
            </div>
          )
        }
      </BackendContext.Consumer>
    );
  }
}

Game.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Game);
