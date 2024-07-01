// src/app.ts
require('dotenv').config();
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { ConnectOptions, connect } from "mongoose"
import userRoutes from "./routes/userRoutes";
import letterRoutes from "./routes/letterRoutes";
import oAuthRoutes from "./routes/oAuthRoutes";
import passport from 'passport';
import session from 'express-session';
import './oAuth/googleOAuth';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 1069;
const mongoURI = process.env.DATABASE || "empty string";

// Connect to MongoDB
mongoose.connect(mongoURI
).then(() => {
    console.log('MongoDB connected');
}).catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit process with failure
});

app.use(express.json());
app.use(session({
    secret: process.env.GOOGLE_CLIENT_SECRET || '', // replace with your own secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: 'auto' } // set to true if you're using https
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// Define routes
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

app.use("/api/users", userRoutes);
app.use("/api/letters", letterRoutes);
app.use('/auth', oAuthRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

