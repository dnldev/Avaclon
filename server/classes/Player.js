const game_log = require('debug')('game');

const PlayerData = require('../../shared/avalon-models/PlayerData');

class Player {
  constructor(name, roleName, socket) {
    this.playerData = new PlayerData(socket.id, name, roleName);
    this.socket = socket;

    game_log('New Player: %s', this.name);
  }
}

module.exports = Player;
