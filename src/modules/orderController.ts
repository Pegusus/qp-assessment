import { Request, Response } from 'express';
import { OrderService } from './orderService';
import { CreateOrderDto, CreateOrderItemDto } from './dto/createOrderDto';
import Role from './constants';
import { AuthMiddleware } from './middlewares/auth-middleware';
import { User } from '../entity/user';

export class OrderController {
    private orderService: OrderService;

    constructor() {
        this.orderService = new OrderService();
        this.createOrder = this.createOrder.bind(this);
    }

    @AuthMiddleware([Role.USER])
    async createOrder(req: Request, res: Response) {
        const decodedUser: User = (req as any).user;
        try {
            const orderData = req.body;
            const createOrderData: CreateOrderDto = {
                userId: decodedUser.id,
                items: orderData['orderItems'] as CreateOrderItemDto[]
            }
            const newOrder = await this.orderService.createOrder(createOrderData);
            return res.status(200).json({
                message: 'Order placed successfully',
                order: newOrder
            });
        } catch (error: unknown) {
            if (error instanceof Error) {
                return res.status(500).json({ message: error.message });
            }
            return res.status(500).json({ message: 'An unknown error occurred' });
        }
    };
}
