var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database("./db.sqlite");


db.serialize(function () {
    db.run("CREATE TABLE IF NOT EXISTS users (login TEXT NOT NULL, pass_hash TEXT NOT NULL, PRIMARY KEY(`login`))");
    db.run("CREATE TABLE IF NOT EXISTS sessions (login TEXT NOT NULL, token TEXT NOT NULL)");
});

function execute(sql, cb) {
    db.serialize(function () {
        db.run(sql, cb);
    });
}

console.log("DB module is loaded.");

exports.execute = execute;
exports.close = db.close;