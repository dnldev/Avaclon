const { Role } = require('./Role');

class PlayerData {
  constructor(id, playerName, role) {
    this.id = id;
    this.name = playerName;
    this.role = new Role(role);
  }
}

module.exports = PlayerData;
