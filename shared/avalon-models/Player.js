const Role = require("./Role").Role;

class Player {
    constructor(id, playerName, role) {
        this.id = id;
        this.name = playerName;
        this.role = new Role(role);
    }
}

module.exports = Player;