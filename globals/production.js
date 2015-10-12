global.ObjectId = require('mongojs').ObjectId;

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
