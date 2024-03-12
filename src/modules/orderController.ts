import { Request, Response } from 'express';
import { OrderService } from './orderService';
import { CreateOrderDto, CreateOrderItemDto } from './dto/createOrderDto';

export class OrderController {
    private orderService: OrderService;

    constructor() {
        this.orderService = new OrderService();
    }

    public createOrder = async (req: Request, res: Response): Promise<Response> => {
        try {
            const orderData = req.body;
            const createOrderData: CreateOrderDto = {
                userId: orderData['userId'],
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
