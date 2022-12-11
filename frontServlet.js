exports.doGet = function (request, response) {
    var command = getCommand(request);
    command.init(null, request, response);
    command.process();
};

function getCommand(request) {
    try {
        var commandClass = getCommandClass(request);
        return new commandClass();
    } catch (e) {
        throw e;
    }
}

function getCommandClass(request) {
    var commandClassName = "./controller/" + request.query["command"] + "Command";
    try {
        return require(commandClassName);
    } catch (e) {
        return require("./controller/commands/unknownCommand");
    }
}