const db = require('../config/db') 

let createQuery = `
CREATE TABLE IF NOT EXISTS todo (
	id INT NOT NULL AUTO_INCREMENT,
	description VARCHAR(50) NULL DEFAULT NULL,
	createdAt DATETIME NULL DEFAULT CURRENT_TIMESTAMP(),
	updatedAt DATETIME NULL,
	PRIMARY KEY (id)
)
COLLATE='utf8mb4_general_ci'
;
`

db.query(createQuery, function (error, results, fields) {
    if (error) throw error;
    console.log('Table has been created');
});

let alterQuery = "ALTER TABLE `todo` CHANGE COLUMN `description` `description` VARCHAR(255)";

db.query(alterQuery, function (error, results, fields) {
    if (error) throw error;
    console.log('Table has been altered ');
});