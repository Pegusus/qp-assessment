import { Router } from 'express';
import { ItemController } from './controller';
import { OrderController } from './orderController';

export function registerRoutes(router: Router) {
    const itemController = new ItemController();
    const orderController = new OrderController();

    router.get('/api/items', itemController.getAllItems);
    router.post('/api/items', itemController.addItems);
    router.delete('/api/item', itemController.removeItem);
    router.put('/api/item', itemController.updateItem);

    router.post('/api/order', orderController.createOrder);
}
