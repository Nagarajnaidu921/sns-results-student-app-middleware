'use strict';
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const TokenServ = require('../lib/token');
const PasswordServ = require('../lib/password');
const Student = require(path.resolve('./app/models')).Student;
const router = express.Router();

function tokenDataGen(data) {
	return {
		id: data.id,
		name: data.fullName,
		regNum: data.registerNumber,
		email: data.email
	};
}

router.route('/login')
.post((req, res) => {
	var body = req.body;
	var resData = {};
	var tokenData = {};
	Student.findOne({registerNumber: body.regNum}, { _id: false })
	.then(data =>{
		if(!data) {
			return false;
		} else if(data) {
			tokenData = tokenDataGen(data);
			return PasswordServ.comparePassword(body.pwd, data.password)
		}
	})
	.then(isSame =>{;
		if(isSame === true) {
			return TokenServ.generateToken(tokenData);
		} else if(isSame === false) {
			return false;
		}
	})
	.then(token => {
		if(token) {
			resData = tokenData;
			resData.token = token;
			resData.isSuccess = true;
			res.send(resData);
		} else if(!token) {
			resData.isSuccess = false;
			resData.message = 'invalid regNum or pwd';
			res.send(resData);
		}
	})
	.catch(err=>{
		console.log(err)
	})
})
module.exports = router;