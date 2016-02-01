var express = require('express');
var router = express.Router();
var r = require('rethinkdb');


var connectionInfo = {
    host: 'localhost',
    port: 28015
};
var conn,
	resumeTable,
	aboutTable;

r.connect(connectionInfo).then(function (c) {
    conn = c;
    resumeTable = r.db('cbio').table('resume');
	aboutTable = r.db('cbio').table('about');
    console.log('connected');
});

/* GET home page. */
router.get('/resume', function (req, res, next) {
    console.log('received request at /resume');
    resumeTable.orderBy({ index: r.desc('tstamp') }).limit(1).run(conn)
        .then(function (cursor) {
            cursor.toArray(function (e, resume) {
                res.json(resume[0]);
            });
        })
        .catch(function (e) {
            res.status(500).json(e).end();
        });

});

router.get('/about', function (req, res, next) {
	console.log('received request at /about');
	aboutTable.orderBy({index: r.desc('tstamp')}).limit(1).run(conn)
		.then(function (cursor) {
			cursor.toArray(function (e, about) {
				res.json(about[0]);
			});
		})
		.catch(function (e) {
			res.status(500).json(e).end();
		});
});

module.exports = router;
