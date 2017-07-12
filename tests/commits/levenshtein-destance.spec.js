const expect = require('chai').expect;
const pull = require('app-root-path').require;
const levDist = pull('src/commits/levenshtein-distance');

describe('testing levenshtein-distance finder', () => {
	it('testing matchness: returns closest matching issue id', done => {
		let key = 'Can a kangaroo jump higher than a house';
		let pool = [{
				"issue": {
					"id": 1,
					"subject": "Can a kangaroo jump higher than a box"
				}
			},
			{
				"issue": {
					"id": 2,
					"subject": " jump higher than aCan a kangaroo house",
				}
			}, {
				"issue": {
					"id": 3,
					"subject": "asdfasdfCan a kangaroo jump higher than a house",
				}
			}, {
				"issue": {
					"id": 4,
					"subject": "Can a kangaroo jumpasdfasdfasdf higher than a house",
				}
			},
		]
		let id = levDist(key, pool);
		expect(id).to.equal(2);
		done();
	})
	it('returns null if there is no enough closeness', done => {
		let key = 'Can a kangaroo jump higher than a house';
		let pool = [{
				"issue": {
					"id": 1,
					"subject": "Canfasdf a kangaroo fasdfasdfafsdjump higher than a boxfasdfa"
				}
			},
			{
				"issue": {
					"id": 2,
					"subject": " jump higher thadfasdfasdfn aCan a kangaroasfasdfasdfasdfao house",
				}
			}, {
				"issue": {
					"id": 3,
					"subject": "asdfasdfCan aasdfasdfasdfas kangaasfdadsfadfsasdfasdfafroo jump higher than a house",
				}
			}, {
				"issue": {
					"id": 4,
					"subject": "Can a kanafasfasdfasdfasdfasfasdfdfasdfasdfasdfadsfgaroo jumpasdfasdfasdf higher than a house",
				}
			},
		]
		let id = levDist(key, pool);
		expect(id).to.be.null;
		done();
	})
})
