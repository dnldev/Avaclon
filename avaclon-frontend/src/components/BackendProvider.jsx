import React, { Component } from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';
import openSocket from 'socket.io-client';

import { BackendContext } from './context';

class BackendProvider extends Component {
  constructor(props) {
    super(props);

    this.serverUrl = 'localhost:5000/lobby/';

    this.resetConfig = {
      connectedToLobby: true,
      currentQuest: 0,
      gameEnded: false,
      gameSetUp: false,
      gameStarted: false,
      isPlayerReady: false,
      loading: false,
      playerCount: 5,
      players: [],
      selectingTeam: false,
      voteTracker: 0,
      wonQuests: [],
    };

    this.state = {
      ...this.resetConfig,
      connectedToLobby: false,
      username: '',
    };

    this.state.checkForSelection = this.checkForSelection.bind(this);
    this.state.handleChange = this.handleChange.bind(this);
    this.state.newGame = this.newGame.bind(this);
    this.state.onUserNameKeyPress = this.onUserNameKeyPress.bind(this);
    this.state.openLobby = this.openLobby.bind(this);
    this.state.playerReady = this.playerReady.bind(this);
    this.state.sendTeam = this.sendTeam.bind(this);
  }

  componentDidMount() {
    const lobby_id = 'josh';

    axios
      .get('http://' + this.serverUrl + lobby_id + '/setUp')
      .then(response => {
        console.log('Lobby Game Set Up: ' + response.data);
        this.setState({ gameSetUp: response.data });
        this.setupConnection(lobby_id);
        console.log('Connected');
      })
      .catch(err => {
        this.setState({ gameSetUp: false });
        console.log('Lobby not found\n' + err);
      });
  }

  componentWillUnmount() {
    this.socket.close();
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  listenForEvents() {
    this.socket.on('start-new-game', gameData => {
      console.log('New Game started');
      this.setState({ loading: false, gameStarted: true, ...gameData });
      this.checkForSelection();
    });

    this.socket.on('game-set-up', () => {
      console.log('Game Set Up');
      this.setState({ gameSetUp: true });
    });

    this.socket.on('selection-start', leader => {
      this.setState({ leaderId: leader });
    });

    this.socket.on('game-close', () => {
      console.log('Game Closed');
      this.setState({ ...this.resetConfig });
    });
  }

  checkForSelection() {
    if (this.state.player.id === this.state.leaderId) {
      this.setState({ selectingTeam: true });
    }
  }

  newGame() {
    this.socket.emit('new-game', {
      gameData: { playerCount: this.state.playerCount },
    });

    this.playerReady();
  }

  openLobby() {
    axios
      .post('http://' + this.serverUrl)
      .then(response => {
        let lobby_id = response.data;
        console.log(lobby_id);
        this.setupConnection(lobby_id);
      })
      .catch(error => {
        console.log(error);
      });
  }

  onUserNameKeyPress(e) {
    if (e.key === 'Enter') {
      if (this.state.gameSetUp) {
        this.playerReady();
      } else {
        this.newGame();
      }
    }
  }

  playerReady() {
    console.log('Username: ' + this.state.username);
    this.socket.emit('player-ready', this.state.username);
    this.setState({ isPlayerReady: true, loading: true });
  }

  sendTeam(team) {
    this.socket.emit('selected-team', team);
    this.setState({ selectingTeam: false });
  }

  setupConnection(lobby_id) {
    console.log('Setup Connection (' + lobby_id + ')');

    this.socket = openSocket(this.serverUrl + lobby_id);

    this.listenForEvents();

    this.setState({ connectedToLobby: true });
  }

  render() {
    return (
      <BackendContext.Provider value={this.state}>
        {this.props.children}
      </BackendContext.Provider>
    );
  }
}

BackendProvider.propTypes = {
  children: PropTypes.object.isRequired,
};

export default BackendProvider;
