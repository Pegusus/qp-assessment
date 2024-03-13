import { Repository } from 'typeorm';
import { db } from '../db/connection';
import { User } from '../entity/user';
import bcrypt from 'bcryptjs';
import Role from './constants';

export class UserService {
    private userRepository: Repository<User>;

    constructor() {
        this.userRepository = db.getRepository(User);
    }

    async getUserAndValidatePassword(email: string, password: string): Promise<User | null> {
        try {
            const user = await this.userRepository.findOne({where: { email }});
            if (!user) {
                return null;
            }
            
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                return null;
            }

            return user;
        } catch (error) {
            console.error('Error fetching user by email or validating password:', error);
            throw error;
        }
    }

    async signUp(email: string, password: string, role: Role, name: string) {
        try {
            const hashedPassword = await bcrypt.hash(password, 5);
            const newUser = await this.userRepository.create({ email, password: hashedPassword, role: role, name: name});
            return await this.userRepository.save(newUser);
        } catch (error) {
            console.error(error);
            throw new Error('Internal server error')
        }
    }

    async getUserByEmail(email: string): Promise<User | null> {
        try {
            const user = await this.userRepository.findOne({where: { email }});
            return user;
        } catch (error) {
            console.error('Error fetching user by email:', error);
            throw error;
        }
    }

}