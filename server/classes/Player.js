const game_log = require('debug')('game');

const PlayerData = require('avalon-models').PlayerData;

class Player {
  constructor(name, socket) {
    this.playerData = new PlayerData(socket.id, name);
    this.socket = socket;

    setupEvents();

    game_log('New Player: %s', this.playerData.name);
  }

  setupEvents() {
    this.socket.on('vote', vote => {
      // TODO: add vote handling
    });
  }
}

module.exports = Player;
