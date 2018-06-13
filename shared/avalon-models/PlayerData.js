const { Role } = require('./Role');
const PlayerInformation = require('./PlayerInformation');

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

  createInfo(roleInfo) {
    return new PlayerInformation(this.id, this.name, roleInfo);
  }
}

module.exports = PlayerData;
