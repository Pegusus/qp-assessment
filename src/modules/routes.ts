import { Router } from 'express';
import { ItemController } from './controller';
import { OrderController } from './orderController';
import { AuthController } from './auth.controller';

export function registerRoutes(router: Router) {
    const authController = new AuthController();
    const itemController = new ItemController();
    const orderController = new OrderController();

    router.post('/api/signup', authController.signUp);
    router.post('/api/login', authController.login)

    router.get('/api/items', itemController.getAllItems);
    router.post('/api/items', itemController.addItems);
    router.delete('/api/item', itemController.removeItem);
    router.put('/api/item', itemController.updateItem);
    router.patch('/api/item', itemController.patchItem);

    router.post('/api/order', orderController.createOrder);
}
