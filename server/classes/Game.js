const game_log = require('debug')('game');

const Player = require('./Player');
const { Role, standardConfig } = require('avalon-models').Role;

Array.prototype.shuffle = function() {
  let input = this;

  for (let i = input.length - 1; i >= 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    const itemAtIndex = input[randomIndex];

    input[randomIndex] = input[i];
    input[i] = itemAtIndex;
  }
  return input;
};

class Game {
  constructor(gameData, admin, namespace) {
    this.gameData = gameData;
    this.admin = admin;
    this.namespace = namespace;

    this.roles = this.createRoles(this.gameData).shuffle();
    this.players = [admin];

    game_log('Game Data:', this.gameData);
    game_log('Admin Name:', this.admin.playerData.name);
    game_log('Roles:', this.roles.map(role => role.name));
  }

  // Event Handler

  newPlayer(name, socket) {
    this.players.push(new Player(name, socket));

    if (this.players.length == this.gameData.playerCount) {
      for (let index = 0; index < this.players.length; index++) {
        let player = this.players[index];
        const role = this.roles[index];
        player.playerData.role = role;
      }
      // Will be changed to emit an event signalizing that all players have joined
      this.start();
    }
  }

  start() {
    this.players.forEach(currentPlayer => {
      const info = {
        information: currentPlayer.playerData.role.knowledge(
          this.players.filter(p => p !== currentPlayer)
        ),
        player: currentPlayer.playerData,
        ...this.gameData,
      };
      game_log(currentPlayer.playerData.name, ':', info.information);
      currentPlayer.socket.emit('start-new-game', info);
    });
    game_log('Game Started');
  }

  // Utility Functions

  createRoles(gameConfig) {
    const base = standardConfig(gameConfig.playerCount).sort((a, b) =>
      this.compareAffiliations(a, b)
    );
    let special = gameConfig.specialRoles;
    if (special) {
      let special = special
        .map(role => new Role(role))
        .sort((a, b) => this.compareAffiliations(a, b));
      return this.mergeRoles(base, special);
    } else {
      return base;
    }
  }

  mergeRoles(base, special) {
    if (base.length == 0) {
      return [];
    } else {
      const [baseRole, ...baseTail] = base;
      const [nextSpecial, ...specialTail] = special;
      if (nextSpecial && baseRole.affiliation === nextSpecial.affiliation) {
        return [nextSpecial].concat(this.mergeRoles(baseTail, specialTail));
      } else {
        return [baseRole].concat(this.mergeRoles(baseTail, special));
      }
    }
  }

  compareAffiliations(role, otherRole) {
    if (role.affiliation < otherRole.affiliation) {
      return -1;
    } else if (role.affiliation > otherRole.affiliation) {
      return 1;
    } else {
      return 0;
    }
  }
}

module.exports = Game;
