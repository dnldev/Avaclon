const { Role } = require('./Role');
const PlayerInformation = require('./PlayerInformation');

class PlayerData {
  constructor(id, playerName) {
    this.id = id;
    this.name = playerName;
  }

  createInfo(roleInfo) {
    return new PlayerInformation(this.id, this.name, roleInfo);
  }
}

module.exports = PlayerData;
