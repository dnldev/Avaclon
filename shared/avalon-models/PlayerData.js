const { Role } = require('./Role');

class PlayerData {
  constructor(id, playerName, roleName) {
    this.id = id;
    this.name = playerName;
    if (roleName !== undefined && roleName !== null) {
      this.role = new Role(roleName);
    } else {
      this.role = null;
    }
  }
}

module.exports = PlayerData;
