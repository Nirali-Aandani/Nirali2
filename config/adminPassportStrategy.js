
const { Strategy, ExtractJwt } = require("passport-jwt")
const { JWT } = require("./authConstant")
const user = require("../model/user")

module.exports = {
    adminPassportStrategy: passport => {
        const options = {};
        options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
        options.secretOrKey = JWT.ADMIN_SECRET
        passport.use('admin-rule',
            new Strategy(options, (payload, done) => {
                user.findOne({ email: payload.email }, (err, user) => {
                    if (err) {
                        // console.log(err)
                        return done(err, false);
                    }
                    if (user) {
                        return done(null, {
                           ...user.toJSON()
                        });
                    }
                    return done('No User Found', {});
                });
            })
        );
    }
}