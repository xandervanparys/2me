// src/models/Letter.ts

import mongoose, { Schema, Document } from 'mongoose';
import { User } from './User';

export interface Letter extends Document {
    title: string;
    content: string;
    writtenAt: Date;
    openAt?: Date;
    user: mongoose.Types.ObjectId | User;
}

const letterSchema = new Schema<Letter>({
    title: { type: String, required: true },
    content: { type: String, required: true },
    writtenAt: { type: Date, default: Date.now },
    openAt: { type: Date },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

const LetterModel = mongoose.model<Letter>('Letter', letterSchema);

export default LetterModel;
