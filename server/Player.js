var Role = require("./Role");

class Player {
    constructor(player_name, role) {
        this.name = player_name;
        this.role = new Role(role);
    }
}

export const Player = Player