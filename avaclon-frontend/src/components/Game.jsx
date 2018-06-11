import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';

import strings from '../localization/game-locale';

import { BackendContext, GameContext } from './context';

import AdminArea from './AdminArea';
import GameUI from './GameUI';

const styles = theme => ({
  root: {
    margin: theme.spacing.unit,
  },
  button: {
    marginRight: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2,
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

    this.state.switchLanguage = this.switchLanguage.bind(this);
    this.state.toggleRoleConcealment = this.toggleRoleConcealment.bind(this);
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

    return (
      <BackendContext.Consumer>
        {context => {
          if (!context.loading) {
            return (
              <div className={classes.root}>
                <GameContext.Provider value={this.state}>
                  <Grid container className={classes.mainGrid} justify="center">
                    <Grid item xs={12}>
                      {!context.gameStarted ? (
                        <AdminArea />
                      ) : (
                        <GameUI players={context.players} />
                      )}
                    </Grid>
                  </Grid>
                </GameContext.Provider>
              </div>
            );
          } else {
            return <LinearProgress color="secondary" />;
          }
        }}
      </BackendContext.Consumer>
    );
  }
}

Game.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Game);
