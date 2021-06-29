const jwt = require("jsonwebtoken");
const util = require("../utils/messages");
const adminSecret = require("../config/authConstant").JWT.ADMIN_SECRET;
const deviceSecret = require("../config/authConstant").JWT.DEVICE_SECRET;
const clientSecret = require("../config/authConstant").JWT.CLIENT_SECRET;
const desktopSecret = require("../config/authConstant").JWT.DESKTOP_SECRET;
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        let url = req.originalUrl;
        let secret = '';
            if(url.includes('admin')){
                secret = adminSecret;
            }
            else if(url.includes('device')){
                secret = deviceSecret;
            }
            else if(url.includes('client')){
                secret = clientSecret;
            }
            else if(url.includes('desktop')){
                secret = desktopSecret;
            }
        jwt.verify(token,secret, (err, user) => {
            if (err) {
                return util.unAuthorizedRequest(err,res);
            }
            req.user = user;
            next();
        });
    } else {
        return util.unAuthorizedRequest(err,res);
    }
};
module.exports = authenticateJWT