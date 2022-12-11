var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database("./db.sqlite");
var crypto = require('crypto');

var Result = require("../domain/result");

exports.doPost = function (request, response) {
    var login = request.body.login;
    var pass = request.body.pass;

    var salt = "secret"
    var passHash = crypto.createHash('md5').update(salt + pass).digest("hex");

    var result = null;

    db.get("SELECT login FROM users where login = ? AND pass_hash = ?", login, passHash, function(err, data){
        if (data != null) {
            crypto.randomBytes(48, function(err, buffer) {
                var token = buffer.toString('hex');
        
                var insertSessionStatement = db.prepare("INSERT INTO sessions(login, token) VALUES (?, ?)");
                insertSessionStatement.run(login, token, err => {
                    var result = null;
                    if (err == null ){
                        insertSessionStatement.finalize();    
                        result = new Result(true, new function Token(){
                            this.token = token
                        }, null)
                    } else {
                        insertSessionStatement.reset();
                        result = new Result(false, null, err.message);
                    }
                    response.send(JSON.stringify(result));
                });  
        
            });
        } else {
            result = new Result(false, null, null) 
            response.send(JSON.stringify(result));
        }
       
    });
};