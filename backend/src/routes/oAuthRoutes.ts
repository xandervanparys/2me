import express from 'express';
import passport from 'passport';

const router = express.Router();

const characters = "abcdefghijklmnopqrstuvwxyz123456789&é";

function generateString(length: number): string {
    let result: string = "";
    for (let i = 0; i < length; i++) {
        let r = Math.floor(Math.random() * characters.length);
        result += characters.charAt(r);
    }
    return result;
}


router.get('/google',
    passport.authenticate('google', {scope: ['profile', 'email']})
);

router.get('/google/callback',
    passport.authenticate('google', {failureRedirect: '/login'}),
    (req, res) => {
        // Successful authentication, redirect home or send response
        console.log("succesful authentication");
        console.log("generating token");
        const token: string = generateString(11);
        console.log("token: " + token);
        res.redirect(process.env.FRONTEND_URL_LOGGED_IN + `?token=${token}` || '');
    }
);

router.get('/logout', (req, res) => {
    req.logout(() => console.log('User logged out'));
    res.redirect(process.env.FRONTEND_URL || ''); // Replace with your frontend URL
});

router.get('/current_user', (req, res) => {
    res.send(req.user);
});

export default router;
