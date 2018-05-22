const Role = require("./Role").Role;

class Player {
    constructor(playerName, role, id) {
        this.id = id;
        this.name = playerName;
        this.role = new Role(role);
    }
}

module.exports = Player;