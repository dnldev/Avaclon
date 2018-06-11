const Affiliation = require('./Affiliation');

const standardConfigs = Object.freeze({
  5: [...Array(2).fill('Generic Red'), ...Array(3).fill('Generic Blue')],
  6: [...Array(2).fill('Generic Red'), ...Array(4).fill('Generic Blue')],
  7: [...Array(3).fill('Generic Red'), ...Array(4).fill('Generic Blue')],
  8: [...Array(3).fill('Generic Red'), ...Array(5).fill('Generic Blue')],
  9: [...Array(3).fill('Generic Red'), ...Array(6).fill('Generic Blue')],
  10: [...Array(4).fill('Generic Red'), ...Array(6).fill('Generic Blue')],
});

function standardConfigFor(playerCount) {
  return standardConfigs[playerCount].map(roleName => new Role(roleName));
}

// Information to construct the roles from names is stored here
// TODO: Entry for roles
const roleLookup = Object.freeze({
  'Generic Blue': {
    affiliation: Affiliation.GOOD,
    hiddenAction: null,
    image: 'genblue',
  },
  'Generic Red': {
    affiliation: Affiliation.EVIL,
    hiddenAction: null,
    image: 'genred',
  },
});

class Role {
  constructor(roleName) {
    this.name = roleName;
    this.roleInformation = roleLookup[roleName];
    this.affiliation = this.roleInformation.affiliation;
    this.hiddenAction = this.roleInformation.hiddenAction;
    this.image = this.roleInformation.image;
    this.questOptions = [this.affiliation];
    if (this.affiliation === Affiliation.EVIL) {
      this.questOptions.push(Affiliation.GOOD);
    }
  }
}

module.exports = {
  Role: Role,
  standardConfig: standardConfigFor,
};
