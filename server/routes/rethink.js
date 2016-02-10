var express = require('express');
var router = express.Router();
var r = require('rethinkdb');


var connectionInfo = {
    host: 'localhost',
    port: 28015
};
var conn,
	resumeTable,
	aboutTable,
	frontEndsTable;

r.connect(connectionInfo).then(function (c) {
    conn = c;
    resumeTable = r.db('cbio').table('resume');
	aboutTable = r.db('cbio').table('about');
	frontEndsTable = r.db('cbio').table('frontEnds');
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

router.get('/frontEnds', function (req, res, next) {
	console.log('received request at /frontEnds');
	frontEndsTable.orderBy({index: r.desc('tstamp')}).limit(1).run(conn)
		.then(function (cursor) {
			cursor.toArray(function (e, frontEnds) {
				res.json(frontEnds[0]);
			});
		})
		.catch(function (e) {
			res.status(500).json(e).end();
		});

});

module.exports = router;
