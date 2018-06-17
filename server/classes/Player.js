const game_log = require('debug')('game');

const PlayerData = require('avalon-models').PlayerData;

class Player {
  constructor(name, socket) {
    this.playerData = new PlayerData(this.sliceSocketId(socket.id), name);
    this.socket = socket;

    game_log('New Player: %s', this.playerData.name);
  }

  sliceSocketId(socketId) {
    return socketId.slice(socketId.indexOf('#') + 1);
  }
}

module.exports = Player;
