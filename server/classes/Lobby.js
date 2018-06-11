const lobby_log = require('debug')('lobby');

const Game = require('./Game');
const Player = require('./Player');

const startingConfig = {
  currentQuest: 0,
  players: [],
  voteTracker: 0,
  wonQuests: [],
};

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
          new Player(data.username, 'Generic Blue', socket),
          this.namespace
        );

        lobby_log('New Game: ', this.game);

        // Temporary TODO: different for each player (specific role/name)
        this.namespace.emit('start-new-game', {
          player: this.game.admin.playerData,
          // players: this.game.players, // TODO: function: getObject of other Players with the current player's information
          ...startingConfig,
          ...this.game.gameData,
        });
      });

      socket.on('join-game', name => {
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
