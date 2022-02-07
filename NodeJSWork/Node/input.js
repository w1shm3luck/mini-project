// input.js
const prompt = require('prompt');
let Validator = require('validatorjs');

prompt.start();

prompt.get(['username', 'email'], function (err, result) {
	if (err) {
    	console.log(err);
    	return 1;
	}
	console.log('Command-line input received:');
	console.log('  Username: ' + result.username);
	console.log('  Email: ' + result.email);

	let data = result
	let rules = {
    	username: 'required',
    	email: 'required|email',
	};

	let validation = new Validator(data, rules);

	console.log(validation.passes())
	console.log("Error on: ", validation.errors.all())
});
