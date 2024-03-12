import { Repository } from 'typeorm';
import { db } from '../db/connection';
import { Item } from '../entity/item';
import { Order } from '../entity/order';
import { OrderItem } from '../entity/orderItem';
import { CreateOrderDto } from './dto/createOrderDto';

export class OrderService {
    private orderRepository: Repository<Order>;
    private orderItemRepository: Repository<OrderItem>;
    private itemRepository: Repository<Item>;
    

    constructor() {
        this.orderRepository = db.getRepository(Order);
        this.orderItemRepository = db.getRepository(OrderItem);
        this.itemRepository = db.getRepository(Item);
    }
    async createOrder(orderDto: CreateOrderDto): Promise<Order | null> {
        const order = new Order();
        order.userId = orderDto.userId;

        const savedOrder = await this.orderRepository.save(order);

        for (const itemDto of orderDto.items) {
            const item = await this.itemRepository.findOneBy({ id: itemDto.itemId });
            if (!item) {
                throw new Error(`Item with ID ${itemDto.itemId} not found`);
            }
            if (!item.available || item.quantity_available < itemDto.quantity) {
                throw new Error(`Item with ID ${itemDto.itemId} is not available or stock is less than ordered quantity`);
            }

            const orderItem = new OrderItem();
            orderItem.order = savedOrder;
            orderItem.item = item;
            orderItem.quantity = itemDto.quantity;
            await this.orderItemRepository.save(orderItem);
        }

        const completeOrder = await this.orderRepository.findOne({
            where: { id: savedOrder.id },
            relations: {
                orderItems: {
                    item: true,
                }
            }
        });

        completeOrder?.orderItems.map((orderItem: any) => {
            const orderedItem = orderItem.item
            delete orderedItem?.quantity_available;
            delete orderedItem?.available;
        })
        return completeOrder;
    }
}
