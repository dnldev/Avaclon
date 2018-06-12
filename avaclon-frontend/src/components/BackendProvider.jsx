import React, { Component } from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';
import openSocket from 'socket.io-client';

import { BackendContext } from './context';

class BackendProvider extends Component {
  constructor(props) {
    super(props);

    this.serverUrl = 'localhost:5000/lobby';

    this.state = {
      connectedToLobby: false,
      currentQuest: 0,
      gameEnded: false,
      gameStarted: false,
      loading: false,
      playerCount: 5,
      username: '',
      players: [],
      voteTracker: 0,
      wonQuests: [],
    };

    this.state.handleChange = this.handleChange.bind(this);
    this.state.newGame = this.newGame.bind(this);
    this.state.openLobby = this.openLobby.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  listenForEvents() {
    this.socket.on('start-new-game', gameData => {
      console.log('New Game started');
      this.setState({ loading: false, gameStarted: true, ...gameData });
    });
  }

  newGame() {
    this.socket.emit('new-game', {
      gameData: { playerCount: this.state.playerCount },
      username: this.state.username,
    });

    this.setState({ loading: true });
  }

  openLobby() {
    if (this.state.socket) {
      this.state.socket.close();
    }

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

  setupConnection(lobby_id) {
    this.socket = openSocket(this.serverUrl + '/' + lobby_id);

    this.socket.open();
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
