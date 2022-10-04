const jwt = require('jsonwebtoken');
const bluebird = require('bluebird');
bluebird.promisifyAll(jwt);
const { ErrorHandler } = require('./error');

module.exports = async function(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (bearerHeader) {
        try {
            const bearer = bearerHeader.split(' ');
            const bearerToken = bearer[1];
            const decoded = await jwt.verifyAsync(bearerToken, process.env.TOKEN_SECRET_KEY);
            if (!decoded) return next(new ErrorHandler(403, 'Error: Token is not valid'));
            req.user = decoded;
            return next();
        } catch (error) {
            return next(new ErrorHandler(403, 'Error: Authorization failed'));
        }

    } else {
        return next(new ErrorHandler(403, 'Error: Not authorized'));
    }
}