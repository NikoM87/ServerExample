var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database("./db.sqlite");
var crypto = require('crypto');
const e = require('express');

var Result = require("../domain/result");

exports.doPost = function (request, response) {
    var login = request.body.login;
    var pass = request.body.pass;

    var salt = "secret"
    var passHash = crypto.createHash('md5').update(salt + pass).digest("hex");

    var insertUserStatement = db.prepare("INSERT INTO users(login, pass_hash) VALUES (?, ?)");
    insertUserStatement.run(login, passHash, err => {
        var result = null;
        if (err == null ){
            insertUserStatement.finalize()
            result = new Result(true, null, null)
        } else {
            insertUserStatement.reset();
            result = new Result(false, null, err.message);
        }
        response.send(JSON.stringify(result));
    });  

};