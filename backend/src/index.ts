// src/app.ts
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { ConnectOptions, connect } from "mongoose"
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const mongoURI = process.env.DATABASE || "empty string";

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
