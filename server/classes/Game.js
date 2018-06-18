const game_log = require('debug')('game');

const Player = require('./Player');
const { Affiliation } = require('avalon-models');
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
    this.admin = admin;
    this.gameData = gameData;
    this.namespace = namespace;
    this.players = [];

    this.questVotes = [];
    this.votingPlayers = 0;

    this.questPlayerCountsForPlayers = {
      5: [2, 3, 2, 3, 3],
      6: [2, 3, 4, 3, 4],
      7: [2, 3, 3, 4, 4],
      8: [3, 4, 4, 5, 5],
      9: [3, 4, 4, 5, 5],
      10: [3, 4, 4, 5, 5],
    };

    this.gameData.voteTracker = 0;
    this.gameData.wonQuests = [];
    this.gameData.questPlayerCounts = this.questPlayerCountsForPlayers[
      this.gameData.playerCount
    ];

    this.roles = this.createRoles(this.gameData).shuffle();

    game_log('Game Data:', this.gameData);
    game_log('Admin Name:', this.admin.playerData.name);
    game_log('Roles:', this.roles.map(role => role.name));
  }

  // Event Handler

  endVotePhase() {
    const teamAccepted = this.teamAccepted();
    this.namespace.emit('vote-result', this.getNamedVotes());

    if (teamAccepted) {
      this.questVote();
    } else {
      this.gameData.voteTracker++;
      this.setNextLeader();
      this.newVotingPhase();
    }
  }

  gameEnding() {
    if (
      this.gameData.wonQuests.filter(quest => quest === Affiliation.EVIL)
        .length === 3
    ) {
      game_log('Evil has won the Game');
      // TODO: evil win handling
    } else if (
      this.gameData.wonQuests.filter(quest => quest === Affiliation.GOOD)
        .length === 3
    ) {
      game_log('Good has won the Game');
      // TODO: good win handling
    } else {
      return false;
    }
    return true;
  }

  newPlayer(name, socket) {
    const newPlayer = new Player(name, socket);
    this.players.push(newPlayer);

    this.setupPlayerEvents(socket, newPlayer.playerData.id);

    if (this.players.length == this.gameData.playerCount) {
      for (let i = 0; i < this.players.length; i++) {
        let player = this.players[i];
        const role = this.roles[i];
        player.playerData.role = role;
      }
      // Will be changed to emit an event signalizing that all players have joined
      this.start();
    }
  }

  newVotingPhase() {
    this.playerVotes = {};
    this.questVotes = [];
    this.votingPlayers = 0;
    // TODO: reset other dependant values
    this.namespace.emit(
      'voting-phase',
      this.gameData.voteTracker,
      this.gameData.leaderId
    );
    if (this.gameData.voteTracker === 4) {
      this.questDone(Affiliation.EVIL);
    }
    // Test that sends a static team
    // this.namespace.emit('team-proposed', [
    //   this.players[0].playerData.id,
    //   this.players[1].playerData.id,
    // ]);

    // this.team = [this.players[0], this.players[1]];
  }

  questDone(winner) {
    this.gameData.voteTracker = 0;
    this.gameData.wonQuests.push(winner);
    if (!this.gameEnding()) {
      this.namespace.emit('quest-conclusion', this.gameData.wonQuests);
      this.setNextLeader();
      this.newVotingPhase();
    }
  }

  questVote() {
    this.team.forEach(id => {
      const player = this.findPlayer(id);
      if (player.playerData.role.affiliation === Affiliation.EVIL) {
        player.socket.emit('quest-voting');
        this.votingPlayers++;
      }
    });

    // TODO: add random delay
    // no evil players in team
    if (this.votingPlayers === 0) {
      this.questDone(Affiliation.GOOD);
    }
  }

  setupPlayerEvents(socket, player_id) {
    socket.on('quest-vote', questVote => {
      game_log(
        'Player (' + this.getPlayerName(player_id) + ') voted:',
        questVote ? 'Success' : 'Fail'
      );

      this.questVotes.push(questVote);

      if (this.questVotes.length === this.votingPlayers) {
        if (questVote) {
          this.questDone(Affiliation.GOOD);
        } else {
          this.questDone(Affiliation.EVIL);
        }
      }
    });

    socket.on('selected-team', team => {
      game_log(
        'Team Selected:',
        team.map(id => this.getPlayerName(id)).join(', ')
      );
      this.team = team;
      this.namespace.emit('team-proposed', team);
    });

    socket.on('vote', vote => {
      game_log(
        'Player (' + this.getPlayerName(player_id) + ') voted:',
        vote ? 'Approve' : 'Reject'
      );
      this.playerVotes[player_id] = vote;

      if (
        Object.values(this.playerVotes).length === this.gameData.playerCount
      ) {
        this.endVotePhase();
      }
    });
  }

  start() {
    this.currentLeaderIdx = Math.floor(Math.random() * this.players.length);

    this.gameData.leaderId = this.players[this.currentLeaderIdx].playerData.id;

    this.players.forEach(currentPlayer => {
      const info = {
        players: currentPlayer.playerData.role.knowledge(
          this.players.filter(p => p !== currentPlayer)
        ),
        player: currentPlayer.playerData,
        teamIds: [],
        ...this.gameData,
      };

      currentPlayer.socket.emit('start-new-game', info);
    });

    this.newVotingPhase();
  }

  // Utility Functions

  compareAffiliations(role, otherRole) {
    if (role.affiliation < otherRole.affiliation) {
      return -1;
    } else if (role.affiliation > otherRole.affiliation) {
      return 1;
    } else {
      return 0;
    }
  }

  createRoles(gameConfig) {
    const baseConfig = standardConfig(gameConfig.playerCount);
    let specialConfig = gameConfig.specialRoles;
    if (specialConfig) {
      specialConfig = specialConfig
        .map(role => new Role(role))
        .sort((a, b) => this.compareAffiliations(a, b)); // special roles might not be sorted
      return this.mergeRoles(baseConfig, specialConfig);
    } else {
      return baseConfig;
    }
  }

  findPlayer(player_id) {
    return this.players.find(player => player.playerData.id === player_id);
  }

  getNamedVotes() {
    let namedVotes = {};
    Object.keys(this.playerVotes).forEach(id => {
      namedVotes[this.getPlayerName(id)] = this.playerVotes[id];
    });

    return namedVotes;
  }

  getPlayerName(player_id) {
    return this.findPlayer(player_id).playerData.name;
  }

  mergeRoles(base, special) {
    // base and special need to be sorted by affiliation
    return base.map(baseRole => {
      const specialRole = special[0];
      if (specialRole.affiliation === baseRole.affiliation) {
        special.shift();
        return specialRole;
      } else {
        return baseRole;
      }
    });
  }

  setNextLeader() {
    this.currentLeaderIdx++;
    if (this.currentLeaderIdx === this.gameData.playerCount) {
      this.currentLeaderIdx = 0;
    }
    this.gameData.leaderId = this.players[this.currentLeaderIdx].playerData.id;
  }

  teamAccepted() {
    return (
      Object.values(this.playerVotes).filter(vote => vote).length >
      this.gameData.playerCount / 2
    );
  }
}

module.exports = Game;
