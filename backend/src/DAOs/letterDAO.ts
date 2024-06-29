// src/dao/LetterDAO.ts

import LetterModel, { Letter } from '../models/Letter';

export class LetterDAO {
    async create(letter: Letter): Promise<Letter> {
        const newLetter = new LetterModel(letter);
        return await newLetter.save();
    }

    async findById(id: string): Promise<Letter | null> {
        return await LetterModel.findById(id).exec();
    }

    async findByTitle(title: string): Promise<Letter[]> {
        const regex = new RegExp(title, 'i'); // 'i' for case-insensitive
        return await LetterModel.find({ title: regex }).exec();
    }

    async findAll(): Promise<Letter[]> {
        return await LetterModel.find().exec();
    }

    async update(id: string, updatedLetter: Partial<Letter>): Promise<Letter | null> {
        return await LetterModel.findByIdAndUpdate(id, updatedLetter, { new: true }).exec();
    }

    async delete(id: string): Promise<Letter | null> {
        return await LetterModel.findByIdAndDelete(id).exec();
    }
}
