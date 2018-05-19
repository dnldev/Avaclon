const standardConfigs = {
  5: [...Array(2).fill("Generic Red"), ...Array(3).fill("Generic Blue")],
  6: [...Array(2).fill("Generic Red"), ...Array(4).fill("Generic Blue")],
  7: [...Array(3).fill("Generic Red"), ...Array(4).fill("Generic Blue")],
  8: [...Array(3).fill("Generic Red"), ...Array(5).fill("Generic Blue")],
  9: [...Array(3).fill("Generic Red"), ...Array(6).fill("Generic Blue")],
  10: [...Array(4).fill("Generic Red"), ...Array(6).fill("Generic Blue")]
};

function standardConfigFor(player_count) {
    return standardConfigs[player_count].map(role_name => new Role(role_name));
}

// Information to construct the roles from names is stored here
// TODO: Entry for roles
var role_lookup = {
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
  constructor(role_name) {
    this.name = role_name;
    this.role_information = role_lookup[role_name];
    this.affiliation = this.role_information.affiliation;
    this.hiddenAction = this.role_information.hiddenAction;
    this.image = this.role_information.image;
    this.missionOptions = [this.affiliation];
    if (this.affiliation == 0) {
      this.missionOptions.push(1);
    }
  }
}

module.exports = { 
    Role: Role,
    standard_config: standardConfigFor
};
