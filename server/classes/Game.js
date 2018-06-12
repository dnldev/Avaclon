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
    this.players.push(new Player(name, 'Generic Blue', socket));

    if (this.players.length == this.gameData.playerCount) {
      // Will be changed to emit an event signalizing that all players have joined
      this.namespace.emit('start-new-game', {
        player: this.game.admin.playerData,
        ...this.game.gameData,
        // TODO: function: getObject of other Players with the current player's information
      });
    }
  }

  start() {
    // TODO: ... start the game
    game_log('Game Started');
  }
}

module.exports = Game;
