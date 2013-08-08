require("../variables.js");
require("../utils.js");
require("../jobs.js");
var assert = require("assert");

/*
 * basic testing
 */
describe('Job occupation', function() {
	it('should add up to 100% every year, assuming working full-time', function() {
		
		// array filled with 0s
		var addedPercentages = newFilledArray((currentYear - initialYear + 1), 0);

		// loop through all jobs and every year occupation and add it
		for (var i = 0; i < jobs.length; i++) {
			job = jobs[i];
	
			for (var j = 0; j < (currentYear-initialYear + 1); j++) {
				addedPercentages[j] += job.occupation[j];
			}
		}
		
		// assertion
		for (var i = 0; i < addedPercentages.length; i++) {
			assert.equal(100, addedPercentages[i]);
		}
	})
})