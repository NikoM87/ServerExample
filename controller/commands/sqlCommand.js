var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database("./db.sqlite");

exports.doPost = function (req, resp) {
    db.all(req.body.expresion, function (err, rows) {
        if (err == null) {
            var body = "SQL выполнен. <br//>" +
                "Выражение SQL: \" " + req.body.expresion + "\"<br//>" +
                "<br//>" +
                "Результат:<br//>";

            rows.forEach(function (row) {
                body += JSON.stringify(row) + "<br//>";
            });

            resp.send(body);
        } else {
            resp.send(err.message);
        }
    });
};

