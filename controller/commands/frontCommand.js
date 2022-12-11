function FrontCommand() {

}

FrontCommand.prototype.init = function (context, request, response) {
    this.context = context;
    this.request = request;
    this.response = response;
};

FrontCommand.prototype.process = function () {
    console.log("process..");
};

FrontCommand.prototype.forward = function (target) {
    var dispatcher = this.context.getRequestDispatcher(target);
    dispatcher.forward(this.request, this.response);
};

module.exports = FrontCommand;