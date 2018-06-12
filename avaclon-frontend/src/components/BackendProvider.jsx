import React, { Component } from 'react';

import axios from 'axios';
import openSocket from 'socket.io-client';

import { BackendContext } from './context';

class BackendProvider extends Component {
  serverURL = 'localhost:5000/lobby';

  constructor(props) {
    super(props);

    this.state = {
      connectedToLobby: false,
      gameEnded: false,
      gameStarted: false,
      loading: false,
      playerCount: 5,
      username: '',
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
      // TODO: player information
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

  setupConnection(lobby_id) {
    this.socket = openSocket(this.serverURL + '/' + lobby_id);

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

export default BackendProvider;
