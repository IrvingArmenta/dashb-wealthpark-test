const jwt = require('jsonwebtoken');
const config = require('config');
 
module.exports = function (req, res, next) {

    console.log(req.header('x-auth-token'));
 
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).send('Access denied. No JWT provided.');
    }
 
    try {
        const decoded = jwt.verify(token, config.get('PrivateKey'));
        req.user = decoded;
        next();
    }
    catch (ex) {
        res.status(400).send('Invalid JWT.');
    }
}