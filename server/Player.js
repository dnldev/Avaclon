const Role = require("./Role").Role;

class Player {
    constructor(playerName, role) {
        this.name = playerName;
        this.role = new Role(role);
    }
}

module.exports = Player;