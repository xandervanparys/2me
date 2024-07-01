import passport from 'passport';
import {Strategy as GoogleStrategy} from 'passport-google-oauth20';
import UserModel, { User } from '../models/User';
import {UserDAO} from '../DAOs/userDAO';

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL: process.env.GOOGLE_CALLBACK_URL!
    },
    async (accessToken, refreshToken, profile, done) => {
        // Instantiate UserDAO
        const userDAO = new UserDAO();

        // Check if user exists in database
        const existingUser = await userDAO.findOne({ oauthId: profile.id });

        if (existingUser) {
            // User exists, return user data
            return done(null, existingUser);
        }

        // Create new user in database
        const newUser = {
            oauthId: profile.id,
            oauthProvider: 'google',
            email: (profile.emails && profile.emails[0] && profile.emails[0].value) ? profile.emails[0].value : '',
            username: profile.displayName
        };

        // Save new user using UserDAO
        const savedUser = await userDAO.create(newUser as User);
        done(null, savedUser);
    }
));
passport.serializeUser((user: any, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id: string, done) => {
    const userDAO = new UserDAO();
    const user = await userDAO.findById(id);
    done(null, user as Express.User);
});
