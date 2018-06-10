const game_log = require('debug')('game');

const Player = require('./Player');

class Game {
  constructor(gameData, admin, namespace) {
    this.gameData = gameData;
    this.admin = admin;
    this.namespace = namespace;

    this.players = [admin];

    game_log(this.gameData);
    game_log(this.admin);
  }

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
}

module.exports = Game;
