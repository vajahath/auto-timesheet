const expect = require('chai').expect;
const login = require('../src/login');
const addActivity = require('../src/timesheet-adder');
const timesheetInit = require('../src/timesheet-initializer');

describe('testing add activity feature', () => {
	it('should successfully login', done => {
		login()
			.then(() => done())
			.catch(err => done(err));
	})

	it('successfully initialize timesheet', done => {
		timesheetInit()
			.then(() => done())
			.catch(err => done(err));
	});

	it('successfully add an activity', done => {
		addActivity({
			date: '2017-07-06',
			projectId: "405",
			startTime: "10:45:00",
			endTime: "11:50:00",
			issueId: "18264",
			taskDetail: 'hello                                                                                                                    ',
		}).then((data) => {
			console.log(data);
			done()
		}).catch(err => {
			done(err);
		})
	})
})
