const game_log = require('debug')('game');

const Player = require('./Player');

// Test purposes only
const gameDataMock = {
  playerCount: 8,
  specialRoles: [],
};

class Game {
  constructor(gameData, admin, namespace) {
    // commented for test purposes
    // this.gameData = gameData;
    this.gameData = gameDataMock;
    this.admin = admin;
    this.namespace = namespace;

    this.roles = createRoles(gameData);
    this.players = [admin];

    game_log(this.gameData);
    game_log(this.admin);
  }

  // Event Handler

  newPlayer(name, socket) {
    this.players.push(new Player(name, socket));

    if (this.players.length == this.gameData.playerCount) {
      this.admin.emit('last-player-joined');
    }
  }

  start() {
    // TODO: ... start the game
    game_log('Game Started');
  }

  // Utility Functions

  createRoles(gameConfig) {}
}

module.exports = Game;
