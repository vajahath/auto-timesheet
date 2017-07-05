const request = require('request');
const lme = require('lme');

let conf = {};

try {
	conf = require('../credentials/config');
} catch (e) {
	lme.e('Ah.. Not found credentials/conf.json');
	process.exit(1);
}

var options = {
	url: 'http://projects.cubettech.com/timesheet/create',
	method: 'POST',
	headers: {
		"Accept": "*/*;q=0.5, text/javascript, application/javascript, application/ecmascript, application/x-ecmascript",
		"Accept-Encoding": "gzip, deflate",
		"Accept-Language": "en-GB,en-US;q=0.8,en;q=0.6",
		"Connection": "keep-alive",
		"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
		"Cookie": conf.Cookie,
		"Host": "projects.cubettech.com",
		"Origin": "http://projects.cubettech.com",
		"Referer": "http://projects.cubettech.com/timesheet",
		"User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.110 Safari/537.36",
		"X-CSRF-Token": conf['X-CSRF-Token'],
		"X-Requested-With": "XMLHttpRequest"
	},
	form: {
		"utf8": "✓",
		"authenticity_token": conf.authenticity_token,
		"date": "2017-07-05",
		"project_id": "405",
		"task[detail]": "attaching activity logger for status change                                                                       ",
		"start_time": "10:45:00",
		"end_time": "11:50:00",
		"issue_id": "18264",
		"commit": "Create",
	}
};


request(options, (err, res, body) => {
	if (err) lme.e("ERR: ", err);

	lme.line();
	if (res.statusCode === 200)
		lme.s('res.statusCode: 200'); // green response
	else lme.w('res.statusCode:' + res.statusCode); // waring type
	lme.line();

	lme.d("response: \n--------\n", body);
})
