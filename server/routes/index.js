var express = require('express');
var router = express.Router();
const SSE = require('../helpers/sse');

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', { title: 'Express' });
});

router.get('/sse', (req, res, next) => {
	const sse = SSE(res);

	const messages = ['first', 'second', 'third', 'fourth', 'fifth'];

	let i = 0;
	const intervalID = setInterval(() => {
		if (i === 0) {
			sse.write(i, 'hallo message');
		} else if (i === 6) {
			sse.write(i, 'hallo result', 'result');
		} else {
			sse.write(i, 'hallo ' + messages[i-1] + ' ping', 'ping');
		}

		i = i + 1;
		if (i === 7) {
			clearInterval(intervalID);
		}
	}, 1000)
});

module.exports = router;
