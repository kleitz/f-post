global.request = require('request').defaults({headers: {authorization: config.global.secret}});
global.should = require('should');
global.ObjectId = require('mongojs').ObjectId;
global.http = require('http');
global.util=require("util");


// global.dump = function dump () {
//     console.log(this.test.fullTitle());
// }

// global.directDump = function directDump() {
//     console.log("\n");
//     console.log(this.fullTitle());
// }
