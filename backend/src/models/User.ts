// src/models/User.ts

import mongoose, { Schema, Document } from 'mongoose';
import { Letter } from './Letter';

export interface User extends Document {
  oauthId: string;
  oauthProvider: string;
  email: string;
  username: string;
  letters: mongoose.Types.Array<Letter['_id']>;
}

const userSchema = new Schema<User>({
  oauthId: { type: String, required: true },
  oauthProvider: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  letters: [{ type: Schema.Types.ObjectId, ref: 'Letter' }]
});

const UserModel = mongoose.model<User>('User', userSchema);

export default UserModel;
