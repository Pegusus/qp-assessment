import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../../entity/user';
import Role from '../constants';

export function AuthMiddleware(allowedRoles: Role[]) {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = function(req: Request, res: Response, next: NextFunction) {
            try {
                const token = req.headers.authorization?.split(' ')[1];
                if (!token) {
                    return res.status(401).json({ message: 'No token provided' });
                }
                jwt.verify(token, 'groceryapp', (err: any, decoded: any) => {
                    if (err) {
                        return res.status(401).json({ message: 'Invalid token' });
                    }
                    const user: User = decoded;
                    if (!allowedRoles.includes(user.role as Role)) {
                        return res.status(403).json({ message: 'Unauthorized' });
                    }
                    (req as any).user = user;
                    return originalMethod.call(this, req, res, next);
                });
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Internal server error' });
            }
        };

        return descriptor;
    }
}
