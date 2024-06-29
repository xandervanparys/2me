// src/app.ts

import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { ConnectOptions, connect } from "mongoose"

const app = express();
const PORT = process.env.PORT || 3000;
const mongoURI = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.1';

// Connect to MongoDB
mongoose.connect(mongoURI
).then(() => {
    console.log('MongoDB connected');
}).catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit process with failure
});
// Define routes
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
