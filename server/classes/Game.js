const game_log = require('debug')('game');

const Player = require('./Player');
const { Role, standardConfig } = require('avalon-models').Role;

class Game {
  constructor(gameData, admin, namespace) {
    this.gameData = gameData;
    this.admin = admin;
    this.namespace = namespace;

    this.roles = this.createRoles(this.gameData);
    this.players = [admin];

    game_log(this.gameData);
    game_log(this.admin);
  }

  // Event Handler

  newPlayer(name, socket) {
    this.players.push(new Player(name, socket));

    if (this.players.length == this.gameData.playerCount) {
      this.admin.emit('last-player-joined');
    }
  }

  start() {
    // TODO: ... start the game
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
