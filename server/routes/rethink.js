var express = require('express');
var router = express.Router();
var r = require('rethinkdb');


var connectionInfo = {
    host: 'localhost',
    port: 28015
};
var conn,
    table;

r.connect(connectionInfo).then(function (c) {
    conn = c;
    table = r.db('cbio').table('resume');
});

/* GET home page. */
router.get('/resume', function (req, res, next) {
    table.orderBy({ index: r.desc('tstamp') }).limit(1).run(conn)
        .then(function (cursor) {
            cursor.toArray(function (e, resume) {
                res.json(resume);
            });
        })
        .catch(function (e) {
            res.status(500).json(e).end();
        });

});

module.exports = router;