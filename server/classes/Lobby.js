const lobby_log = require('debug')('lobby');

const Game = require('./Game');
const Player = require('./Player');

class Lobby {
  constructor(id, namespace) {
    this.id = id;
    this.namespace = namespace;

    lobby_log('ID: %s', this.id);

    this.setupEvents();
  }

  setupEvents() {
    this.namespace.on('connection', socket => {
      lobby_log('Socket connected');

      socket.on('new-game', data => {
        this.game = new Game(
          data.gameData,
          new Player(data.username, socket, 'Generic Blue'),
          this.namespace
        );

        lobby_log('New Game: ', this.game);
      });

      socket.on('player-ready', name => {
        this.game.newPlayer(name, socket);
      });

      socket.on('start-game', () => {
        this.game.start();
      });

      this.namespace.emit('welcome');
    });
  }
}

module.exports = Lobby;
