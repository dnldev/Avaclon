const lobby_log = require('debug')('lobby');

const Game = require('./Game');
const Player = require('./Player');

class Lobby {
  constructor(id, namespace) {
    this.id = id;
    this.namespace = namespace;
    this.setUp = false;

    lobby_log('ID: %s', this.id);

    this.setupEvents();
  }

  closeGame() {
    lobby_log('Game Closing');
    this.namespace.emit('game-close');
    this.setUp = false;
  }

  setupEvents() {
    this.namespace.on('connection', socket => {
      lobby_log('Socket connected');

      socket.on('new-game', data => {
        lobby_log('New Game');
        this.game = new Game(
          data.gameData,
          new Player(data.username, socket, 'Generic Blue'),
          this.namespace
        );
        this.setUp = true;

        this.namespace.emit('game-set-up');
      });

      socket.on('user-ready', name => {
        lobby_log('User Ready');
        if (this.game) {
          this.game.newPlayer(name, socket);
        } else {
          lobby_log('Game not yet defined');
        }
      });

      socket.on('disconnect', () => {
        if (
          this.game &&
          this.game.players.some(player => player.socket === socket)
        ) {
          this.closeGame();
        }
        lobby_log('Player Disconnected');
      });

      socket.on('start-game', () => {
        this.game.start();
      });
    });
  }
}

module.exports = Lobby;
