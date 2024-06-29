// src/dao/UserDAO.ts

import UserModel, { User } from '../models/User';

export class UserDAO {
    async create(user: User): Promise<User> {
        const newUser = new UserModel(user);
        return await newUser.save();
    }

    async findById(id: string): Promise<User | null> {
        return await UserModel.findById(id).exec();
    }

    async findAll(): Promise<User[]> {
        return await UserModel.find().exec();
    }

    async update(id: string, updatedUser: Partial<User>): Promise<User | null> {
        return await UserModel.findByIdAndUpdate(id, updatedUser, { new: true }).exec();
    }

    async delete(id: string): Promise<User | null> {
        return await UserModel.findByIdAndDelete(id).exec();
    }
}
