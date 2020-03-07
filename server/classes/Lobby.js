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

      socket.on('new-game', ({ gameData, username }) => {
        lobby_log('New Game');

        this.game = new Game(
          gameData,
          new Player(username, socket),
          this.namespace
        );
        this.setUp = true;

        this.namespace.emit('game-set-up', gameData.playerCount);
      });

      socket.on('start-game', () => {
        this.game.start();
      });

      socket.on('user-ready', name => {
        lobby_log('User (%s) Ready', name);
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
    });
  }
}

module.exports = Lobby;
