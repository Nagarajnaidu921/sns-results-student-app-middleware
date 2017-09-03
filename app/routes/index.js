'use strict';
const auth = require('./auth');
const resultCtrl = require('./result');
const path = require('path');
const Token = require(path.resolve('./app/lib/token'));


function sendErrorResposns(error, res) {
    const { message } = error;
    return res.status(403).json({
        message,
        success: false
    })
}

function isAuthorized(req, res, next) {
    // console.log(req.headers)
    const token = req.headers.Authorization || req.headers.authorization || req.headers['x-access-token'];
    if (token) {
        Token.verifyToken(token)
            .then(decodedToken => {
                req.adminId = decodedToken.adminId;
                return next();
            })
            .catch(error => sendErrorResposns(error, res))
    } else {
    	const error = new Error('Unauthorized Access');
    	return sendErrorResposns(error, res);
    }
}
module.exports = app => {
	 // app.use('/home/*', isAuthorized); 
	 app.use('/api/*', isAuthorized)
   app.use('/auth', auth);
   app.use('/api/student/result/',resultCtrl);
};