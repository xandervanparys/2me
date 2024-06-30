import express, {Request, Response} from 'express';
import {LetterDAO} from '../DAOs/letterDAO';
import {User} from '../models/User';
import {Letter} from '../models/Letter';

const router = express.Router();
const letterDAO = new LetterDAO();

// POST /api/letters - Create a new letter
router.post('/', async (req: Request, res: Response) => {
    try {
        const letter = await letterDAO.create(req.body as Letter);
        return res.json(letter);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// GET /api/letters/ - Get all letters in db
router.get('/', async (req: Request, res: Response) => {
    try {
        const letters = await letterDAO.findAll();
        return res.json(letters);
    } catch (error) {
        console.error('Error fetching letters:', error);
        return res.status(500).json({error: 'Internal Server Error'});
    }
});

// GET /api/letters/:id - Get a letter by ID
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const letter = await letterDAO.findById(req.params.id);
        if (!letter) {
            return res.status(404).json({message: 'Letter not found'});
        }
        res.json(letter);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// PUT /api/letters/:id - Update a letter by ID
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const updatedLetter = await letterDAO.update(req.params.id, req.body as Partial<Letter>);
        if (!updatedLetter) {
            return res.status(404).json({message: 'Letter not found'});
        }
        res.json(updatedLetter);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// DELETE /api/letters/:id - Delete a letter by ID
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const deletedLetter = await letterDAO.delete(req.params.id);
        if (!deletedLetter) {
            return res.status(404).json({message: 'Letter not found'});
        }
        res.json(deletedLetter);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

export default router;