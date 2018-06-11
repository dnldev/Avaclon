import React, { Component } from 'react';

import axios from 'axios';
import openSocket from 'socket.io-client';

import BackendContext from '../context/backend-context';

class BackendProvider extends Component {
  serverURL = 'localhost:5000/lobby';

  constructor(props) {
    super(props);
    this.state = {
      currentQuest: 3,
      gameEnded: false,
      hideRole: true,
      loading: false,
      playerCount: 8,
      voteMarker: 3,
      wonQuests: ['good', 'evil', 'evil'],
    };

    this.state.openLobby = this.openLobby.bind(this);
    this.state.resetGame = this.resetGame.bind(this);
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

  resetGame() {
    // TODO: implement new game
    console.log('Not implemented');
  }

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

  render() {
    return (
      <BackendContext.Provider value={this.state}>
        {this.props.children}
      </BackendContext.Provider>
    );
  }
}

export default BackendProvider;
