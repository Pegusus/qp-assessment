import { Repository } from 'typeorm';
import { db } from '../db/connection';
import { Item } from '../entity/item';

export class ItemService {
    private itemRepository: Repository<Item>;

    constructor() {
        this.itemRepository = db.getRepository(Item);
    }
    async addItems(itemDataArray: Item[]): Promise<void> {
        const newItems = this.itemRepository.create(itemDataArray);
        await this.itemRepository.save(newItems);
    }

    async getAllItems(page: number = 1, pageSize: number = 10, excludeDeleted = false): Promise<[Item[], number]> {
        const params: any = {
            skip: (page - 1) * pageSize,
            take: pageSize,
        }
        if (excludeDeleted) {
            params['where'] = { available: excludeDeleted }
        }
        const [items, total] = await this.itemRepository.findAndCount(params);
        return [items, total];
    }

    async removeItem(itemId: number): Promise<void> {
        const item = await this.itemRepository.findOneByOrFail({ id: itemId });
        item.available = false;
        await this.itemRepository.save(item);
    }

    async updateItem(updateItem: Item): Promise<Item> {
        try {
            const itemObject = await this.itemRepository.findOneByOrFail({id: updateItem.id})
            const { name, price, description, category, quantity_available, available } = updateItem; 

            itemObject.name = name;
            itemObject.price = price;
            itemObject.description = description;
            itemObject.category = category;
            itemObject.quantity_available = quantity_available;
            itemObject.available = available;

            await this.itemRepository.save(itemObject);

            const getItem = await this.itemRepository.findOneByOrFail({id: updateItem.id})
            return getItem;
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(error.message)
            } else {
                throw new Error('Unknown Error occurred');
            }
        }
    }
        
}
