const authUtils = require('./authUtilites');

function authentificate(req, res, next) {
    const token = req.headers.authorization;
    
    if (!token) {
        return res.status(401).json({ Error: 'Unauthorized' });
    }

    const decodedtoken = authUtils.verifyToken(token);
    if(!decadetoken){
        return res.status(401).json({ Error: 'Unauthorized' });
    }
    res.user = decodedtoken;
    next();
}

module.exports = authentificate;