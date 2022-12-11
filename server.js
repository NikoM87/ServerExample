var express = require("express");
var bodyParser = require('body-parser');

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database("./db.sqlite");

var registrationServlet = require('./controller/registrationServerlet');
var loginServlet = require('./controller/loginServlet');
var getMeServlet = require('./controller/getMeServlet');

var frontServlet = require('./frontServlet');
var sqlCommand = require('./controller/commands/sqlCommand');

function start() {
    var app = express();
    app.use(bodyParser.urlencoded({extended: false})); // parse application/x-www-form-urlencoded


    // Site
    app.get("/", function (req, res) {
        res.sendfile("./site/index.html");

        console.log("Get home page");
    });

    app.get("/registration", function (req, res) {
        res.sendfile("./site/registration.html");
    });

    app.get("/login", function (req, res) {
        res.sendfile("./site/login.html");
    });

    app.get("/execute", function (req, resp) {
        resp.sendfile("./site/execute.html");
    });

    app.post("/sql", sqlCommand.doPost);

    // API
    app.post("/registration", registrationServlet.doPost);
    app.post("/login", loginServlet.doPost);
    app.get("/getMe", getMeServlet.doGet);

    
    app.listen(8888, function () {
        console.log('Example app listening on port 8888!');
    });
}

exports.start = start;