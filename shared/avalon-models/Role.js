const standardConfigs = {
  5: [...Array(2).fill("Generic Red"), ...Array(3).fill("Generic Blue")],
  6: [...Array(2).fill("Generic Red"), ...Array(4).fill("Generic Blue")],
  7: [...Array(3).fill("Generic Red"), ...Array(4).fill("Generic Blue")],
  8: [...Array(3).fill("Generic Red"), ...Array(5).fill("Generic Blue")],
  9: [...Array(3).fill("Generic Red"), ...Array(6).fill("Generic Blue")],
  10: [...Array(4).fill("Generic Red"), ...Array(6).fill("Generic Blue")]
};

function standardConfigFor(playerCount) {
    return standardConfigs[playerCount].map(roleName => new Role(roleName));
}

// Information to construct the roles from names is stored here
// TODO: Entry for roles
const roleLookup = {
  "Generic Blue": {
    affiliation: 1,
    hiddenAction: null,
    image: "path to genblue"
  },
  "Generic Red": {
    affiliation: 0,
    hiddenAction: null,
    image: "path to genred"
  }
};

class Role {
  constructor(roleName) {
    this.name = roleName;
    this.roleInformation = roleLookup[roleName];
    this.affiliation = this.roleInformation.affiliation;
    this.hiddenAction = this.roleInformation.hiddenAction;
    this.image = this.roleInformation.image;
    this.missionOptions = [this.affiliation];
    if (this.affiliation == 0) {
      this.missionOptions.push(1);
    }
  }
}

module.exports = { 
    Role: Role,
    standardConfig: standardConfigFor
};
