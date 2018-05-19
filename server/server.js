const Player = require('./Player');
const Role = require('./Role').Role;
const configs = require('./Role').configs;

let p = new Player("Joosh", "Generic Blue");
console.log(p);
console.log(configs[6]);