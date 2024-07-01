import express from 'express';
import passport from 'passport';

const router = express.Router();

router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        // Successful authentication, redirect home or send response
        console.log("succesful authentication");
        res.redirect(process.env.FRONTEND_URL_LOGGED_IN || '');
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
