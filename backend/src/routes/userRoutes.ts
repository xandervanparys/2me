import express, {Request, Response} from 'express';
import {UserDAO} from '../DAOs/userDAO';
import {User} from '../models/User';

const router = express.Router();
const userDAO = new UserDAO();

// POST /api/users - Create a new user
router.post('/', async (req: Request, res: Response) => {
    try {
        const newUser = await userDAO.create(req.body as User);
        res.json(newUser);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// GET /api/users/ - Get all users in db
router.get('/', async (req: Request, res: Response) => {
    try {
        const users = await userDAO.findAll();
        return res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        return res.status(500).json({error: 'Internal Server Error'});
    }
});

// GET /api/users/:id - Get a user by ID
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const user = await userDAO.findById(req.params.id);
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// PUT /api/users/:id - Update a user by ID
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const updatedUser = await userDAO.update(req.params.id, req.body as Partial<User>);
        if (!updatedUser) {
            return res.status(404).json({message: 'User not found'});
        }
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// DELETE /api/users/:id - Delete a user by ID
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const deletedUser = await userDAO.delete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({message: 'User not found'});
        }
        res.json({message: 'User deleted'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

export default router;
