
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
}

class Role {
    constructor(role_name) {
        this.name = role_name;
        role_information = role_lookup[role_name];
        this.affiliation = role_lookup.affiliation;
        this.action = role_lookup.hiddenAction;
        this.image = role_lookup.image;
        this.missionOptions = [this.affiliation]
        if (this.affiliation == 0) {
            this.missionOptions.push(1);
        }
    }
}

export default Role;