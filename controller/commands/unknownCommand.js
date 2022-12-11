var util = require('util');
var FrontCommand = require("./frontCommand");
var Error = require("../../domain/error");

util.inherits(UnknownCommand, FrontCommand);

function UnknownCommand() {
    UnknownCommand.super_.apply(this);
}

UnknownCommand.prototype.process = function () {
    var err = new Error("Неизвестная команда");

    this.response.send(JSON.stringify(err));
};

module.exports = UnknownCommand;