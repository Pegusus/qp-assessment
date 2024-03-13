import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { User } from '../entity/user';
import { UserService } from './auth.service';

const secretKey = 'groceryapp';

export class AuthController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }
    
    login = async (req: Request, res: Response) => {
        try {
          const { email, password } = req.body;
          
          if (!email) {
            res.status(400).json({"message": "Email is missing!"})
          }
          if (!password) {
            res.status(400).json({"message": "Password is missing!"})
          }
          const user: User | null = await this.userService.getUserAndValidatePassword(email, password);
          if (!user) return res.status(400).json({"message": "User needs to sign up"});
          const token = jwt.sign({ id: user?.id, email: user?.email, role: user?.role }, secretKey, { expiresIn: '12h' });
          return res.json({ token });
        } catch (error) {
          console.error(error);
          throw new Error('Internal server error');
        }
      }

    signUp = async (req: Request, res: Response) => {
        try {
            const { email, password, role, name } = req.body;
            
            if (!email || !password || !role || !name) {
                return res.status(400).json({ message: 'Email, password, role, name are required' });
            }

            const existingUser = await this.userService.getUserByEmail(email);
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists, login' });
            }

            const newUser = await this.userService.signUp(email, password, role, name);

            const token = jwt.sign({ id: newUser.id, email: newUser.email, role: newUser.role }, secretKey, { expiresIn: '12h' });
            return res.json({ token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}
