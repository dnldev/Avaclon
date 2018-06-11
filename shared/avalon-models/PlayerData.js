const { Role } = require('./Role');

class PlayerData {
  constructor(id, playerName, roleName) {
    this.id = id;
    this.name = playerName;
    this.role = new Role(roleName);
  }
}

module.exports = PlayerData;
