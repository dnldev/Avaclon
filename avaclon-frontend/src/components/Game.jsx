import React, { Component } from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';
import openSocket from 'socket.io-client';

import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';

import strings from '../localization/game-locale';

import GameContext from '../context/game-context';

import AdminArea from './AdminArea';
import AutoCollapsing from './AutoCollapsing';
import Board from './Board';
import PlayerView from './PlayerView';
import UserControlArea from './UserControlArea';
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
  serverURL = 'localhost:5000/lobby';

  constructor(props) {
    super(props);

    this.state = {
      // TODO: get state init values from socket.io
      currentQuest: 3,
      currentLanguage: 'en',
      gameEnded: false,
      hideRole: true,
      playerCount: 8,
      voteMarker: 3,
      wonQuests: ['good', 'evil', 'evil'],
    };

    this.state.isAdmin = true;
    this.state.loading = false;
    this.state.terminalOpen = false;

    this.state.openLobby = this.openLobby.bind(this);
    this.state.resetGame = this.resetGame.bind(this);
    this.state.switchLanguage = this.switchLanguage.bind(this);
    this.state.toggleRoleConcealment = this.toggleRoleConcealment.bind(this);

    this.switchLanguage = this.switchLanguage.bind(this);
  }

  getClonedObject(object) {
    return JSON.parse(JSON.stringify(object));
  }

  // Test method --> will be moved to Lobby section in App
  openLobby() {
    if (this.state.socket) {
      this.state.socket.close();
    }

    axios
      .post('http://' + this.serverURL)
      .then(response => {
        let lobby_id = response.data;
        console.log(lobby_id);
        this.setupConnection(lobby_id);
      })
      .catch(error => {
        console.log(error);
      });
  }

  resetGame() {
    console.log('Not implemented');

    // TODO: force new game with Socket.IO
  }

  // TODO: return promise --> .then(setup events)
  setupConnection(lobby_id) {
    let socket = openSocket(this.serverURL + '/' + lobby_id);

    socket.open();

    // TODO: move events to different functions
    socket.on('welcome', () => {
      console.log('Connected');
    });

    socket.emit('new-game', {
      gameData: { playerCount: 10 },
      username: 'Daniel',
    });

    this.setState({ socket: socket });
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
            <Grid container className={classes.mainGrid} justify="center">
              {/* Uncomment to test different languages (also uncomment imports) */}
              <Grid item xs={12}>
                {this.state.isAdmin ? <AdminArea /> : <UserControlArea />}
              </Grid>

              <Grid item lg={8} md={9} sm={11} xs={12}>
                <PlayerView players={players} />
              </Grid>

              <Grid item lg={6} md={8} sm={10} xs={12}>
                <Board />
              </Grid>
              <Grid
                item
                className={classes.userTerminalArea}
                lg={8}
                md={9}
                xs={12}
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
