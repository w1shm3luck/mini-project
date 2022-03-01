const db = require("../../config/dbConnection");

const createPetCategoryQuery = `
  CREATE TABLE IF NOT EXISTS pet_category (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL,
    PRIMARY KEY (id)
  );
`;

db.query(createPetCategoryQuery, (err, result) => {
  if (err) {
    throw err;
  } else {
    console.log("Table pet_category created!");
  }
});

const createPetQuery = `
  CREATE TABLE IF NOT EXISTS pet (
    id INT NOT NULL AUTO_INCREMENT,
    category_id INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    status VARCHAR(20) NOT NULL,
    quantity INT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    PRIMARY KEY (id),
    FOREIGN KEY (category_id) REFERENCES pet_category(id)
  );
`;

db.query(createPetQuery, (err, result) => {
  if (err) {
    throw err;
  } else {
    console.log("Table pet created!");
  }
});

const createStoreOrderQuery = `
  CREATE TABLE IF NOT EXISTS store_order (
    id INT NOT NULL AUTO_INCREMENT,
    pet_id INT NOT NULL,
    quantity INT NOT NULL,
    ship_date DATETIME,
    status VARCHAR(20) NOT NULL,
    complete BOOLEAN NOT NULL DEFAULT FALSE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    PRIMARY KEY (id),
    FOREIGN KEY (pet_id) REFERENCES pet(id)
  );
`;

db.query(createStoreOrderQuery, (err, result) => {
  if (err) {
    throw err;
  } else {
    console.log("Table store_order created!");
  }
});

const createUserQuery = `
  CREATE TABLE IF NOT EXISTS user (
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(30) NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(30) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    PRIMARY KEY (id)
  );
`;

db.query(createUserQuery, (err, result) => {
  if (err) {
    throw err;
  } else {
    console.log("Table user created!");
  }
});
