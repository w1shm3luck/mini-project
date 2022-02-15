const db = require('../config/db') 

let data = [
	{description: "1st todo"},
	{description: "2nd todo"},
	{description: "3rd todo"},
]

data.forEach(value => {
	let insertQuery = `INSERT INTO todo (description) VALUES (?);`
	db.query(insertQuery, value.description, function (error, results, fields) {
		if (error) throw error;
		console.log('Data has been inserted');
	});
});