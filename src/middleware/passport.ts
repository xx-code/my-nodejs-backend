
import  { ExtractJwt, Strategy }  from 'passport-jwt';
import User, { user } from '../models/User';

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: ''
}

export default (passport:any, key:any) => {
    opts.secretOrKey = key;
    passport.use(
        new Strategy(opts, (jwt_payload, done) => {
            User.findById(jwt_payload.id)
                .then(user => {
                    if (user) {
                        return done(null, user);
                    }
                    return done(null, false);
                })
                .catch(err => err)
        })
    );
};