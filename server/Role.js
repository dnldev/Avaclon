const standard_configs = {
  5: [...Array(2).fill("Generic Red"), ...Array(3).fill("GenericBlue")],
  6: [...Array(2).fill("Generic Red"), ...Array(4).fill("GenericBlue")],
  7: [...Array(3).fill("Generic Red"), ...Array(4).fill("GenericBlue")],
  8: [...Array(3).fill("Generic Red"), ...Array(5).fill("GenericBlue")],
  9: [...Array(3).fill("Generic Red"), ...Array(6).fill("GenericBlue")],
  10: [...Array(4).fill("Generic Red"), ...Array(6).fill("GenericBlue")]
};

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
    configs: standard_configs
};
