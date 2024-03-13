import { Request } from 'express';
import { User } from './entity/user';

interface CustomRequest extends Request {
    user?: User;
}

declare module 'express' {
    export interface Request extends CustomRequest {}
}
