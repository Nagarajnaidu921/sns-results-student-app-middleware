'use strict';
const path = require('path');
const jwt = require('jsonwebtoken');
const config = require('config');
const jwtSecret = config.jwt.secret;
const jwtExpireTime = config.jwt.tokenExpireTime;
console.log(config.PORT)

function generateToken(payload) {
	console.log(payload.userName)
	const payloadIsEmpty = Object.keys(payload).length !== 0;
	if(payloadIsEmpty) {
		if((typeof payload) === 'object') {
			return new Promise((resolve, reject) => {
				jwt.sign(payload, jwtSecret, (error, token) => {
					// jwt.sign(payload, jwtSecret, { expiresIn: jwtExpireTime }, (error, token) => {
					if (error) {
						reject(error);
					} else {
						resolve(token);
					}
				})
			})
		} else {
			const error = new Error('Token payload should be an object');
			return Promise.reject(error);
		}
	} else {
		const error = new Error('Token paload should not be empty');
		return Promise.reject(error);
	}
}
function verifyToken(token) {
	if(token) {
		return new Promise((resolve, reject) => {
			jwt.verify(token, jwtSecret, (error, decodedToken) => {
				if(error) {
					reject(error);
				} else if(decodedToken) {
					resolve(decodedToken);
				}
			})
		})
	} else {
		const error = new Error('Token Should Not Be Empty');
		return Promise.reject(error);
	}
}
module.exports = {
	generateToken: generateToken,
	verifyToken: verifyToken
}
