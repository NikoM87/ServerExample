var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database("./db.sqlite");
var crypto = require('crypto');
const e = require('express');

var Result = require("../domain/result");

exports.doGet = function (request, response) {
    try {
        var token = request.query["token"];

        db.get("SELECT login FROM sessions where token = ?", token, function(err, data){
            var result = null;
            if (data != null) {
                if (err == null ){
                    result = new Result(true, new function Profile(){
                        this.login = data["login"]
                    }, null)
                } else {
                    result = new Result(false, null, err.message);
                }

            } else {
                result = new Result(false, null, null) 
            }

            response.send(JSON.stringify(result));
        });
    } catch(e) {
        result = new Result(false, null, e.message);
        response.send(JSON.stringify(result));
    }
    
};