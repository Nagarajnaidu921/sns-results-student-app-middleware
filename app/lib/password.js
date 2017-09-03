'use strict';
const bcrypt = require('bcrypt');
const saltRounds = 10;

function comparePassword(plainPassword, hashedPassword) {
	return new Promise((resolve, reject) =>{
		bcrypt.compare(plainPassword, hashedPassword)
		.then(isSame =>{
			return resolve(isSame);
		})
		.catch(err => {
			return reject(err);
		})
	})
}


module.exports = {
	comparePassword: comparePassword
};
