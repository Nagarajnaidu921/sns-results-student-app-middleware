'use strict';
const config = {
	db: {
		uri: 'mongodb://localhost/testdb'
	},
	jwt: {
		secret: (process.env.JWT_SECRET || 'test-jwt-secret')
	},
	PORT: 3001
};
module.exports = config;