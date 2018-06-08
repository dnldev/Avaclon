const game_log = require('debug')('game');

class Player {
  constructor(name, socket) {
    this.name = name;
    this.socket = socket;

    game_log('New Player: %s', this.name);
  }
}

module.exports = Player;
