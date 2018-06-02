import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';

import strings from '../localization/game-locale';

import GameContext from './game-context';

// import AdminArea from './AdminArea';
import AutoCollapsing from './AutoCollapsing';
import Board from './Board';
import PlayerView from './PlayerView';
// import UserControlArea from './UserControlArea';
import UserTerminal from './UserTerminal';

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
  currentLanguage = 'en';

  constructor(props) {
    super(props);

    this.state = {
      // TODO: get state init values from socket.io
      currentQuest: 2,
      gameEnded: false,
      hideRole: true,
      playerCount: 8,
      voteMarker: 3,
      wonQuests: ['good', 'evil'],
    };

    this.state.isAdmin = false;
    this.state.loading = false;
    this.state.terminalOpen = false;

    this.state.resetGame = this.resetGame.bind(this);
    this.state.switchLanguage = this.switchLanguage.bind(this);
    this.state.toggleRoleConcealment = this.toggleRoleConcealment.bind(this);

    this.switchLanguage = this.switchLanguage.bind(this);
  }

  getClonedObject(object) {
    return JSON.parse(JSON.stringify(object));
  }

  toggleRoleConcealment() {
    this.setState(prevState => {
      return { hideRole: !prevState.hideRole };
    });
  }

  resetGame() {
    console.log('Not implemented');

    // TODO: force new game with Socket.IO
  }

  switchLanguage() {
    this.currentLanguage = this.currentLanguage === 'en' ? 'de' : 'en';
    strings.setLanguage(this.currentLanguage);
    this.setState({});
  }

  render() {
    const { classes } = this.props;
    const goodPlayer = {
      name: 'Daniel',
      role: {
        affiliation: 'good',
        image: 'genblue',
        name: strings.roles.good,
      },
    };
    // const evilPlayer = {
    //   name: 'Josh',
    //   role: {
    //     affiliation: 'evil',
    //     image: 'genred',
    //     name: strings.roles.evil,
    //   },
    // };

    const players = [
      { name: 'Thomas', id: 1, role: 'unknown' },
      { name: 'Josh', id: 2, role: 'unknown' },
      { name: 'BRN', id: 3, role: 'unknown' },
      { name: 'Martin', id: 4, role: 'merlinOrMorgana' },
      { name: 'Benni', id: 5, role: 'unknown' },
      { name: 'Kevin', id: 6, role: 'merlinOrMorgana' },
      { name: 'Jess', id: 7, role: 'unknown' },
    ];

    if (!this.state.loading) {
      return (
        <div className={classes.root}>
          <GameContext.Provider value={this.state}>
            <Grid className={classes.mainGrid} justify="center" container>
              {/* Uncomment to test different languages (also uncomment imports) */}
              {/* <Grid xs={12} item> 
                {this.state.isAdmin ? <AdminArea /> : <UserControlArea />}
              </Grid> */}

              <Grid lg={8} md={9} sm={11} xs={12} item>
                <PlayerView players={players} />
              </Grid>

              <Grid lg={6} md={8} sm={10} xs={12} item>
                <Board />
              </Grid>
              <Grid
                className={classes.userTerminalArea}
                lg={8}
                md={9}
                xs={12}
                item
              >
                <AutoCollapsing>
                  <UserTerminal player={goodPlayer} />
                </AutoCollapsing>
              </Grid>
            </Grid>
          </GameContext.Provider>
        </div>
      );
    } else {
      return <LinearProgress color="secondary" />;
    }
  }
}

Game.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Game);
