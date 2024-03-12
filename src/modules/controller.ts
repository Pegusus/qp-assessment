import { Request, Response } from 'express';
import { ItemService } from './service';

export class ItemController {
  private itemService: ItemService;

  constructor() {
    this.itemService = new ItemService();
  }

  addItems = async (req: Request, res: Response) => {
    try {
      if (!Array.isArray(req.body)) {
        return res.status(400).json({ message: "Expected an array of items" });
      }
      const newItems = await this.itemService.addItems(req.body);
      res.status(201).json(newItems);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
          } else {
            res.status(500).json({ message: "An unknown error occurred" });
          }
    }
  };

  getAllItems = async (req: Request, res: Response) => {
    try {
        const page: number = parseInt(req.query.page as string) || 1;
        const pageSize: number = parseInt(req.query.pageSize as string) || 10;
        const excludeDeleted: boolean = Boolean(req.query.excludeDeleted as string) || false;

        const [items, total] = await this.itemService.getAllItems(page, pageSize, excludeDeleted);
        res.status(200).json({
            items,
            total,
            page,
            pageSize,
            totalPages: Math.ceil(total / pageSize),
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
};

removeItem = async (req: Request, res: Response) => {
    const itemId = parseInt(req.query.id as string);
    if (!itemId) {
        return res.status(400).json({ message: "Expected item id" });
    }
    try {
      await this.itemService.removeItem(itemId);
      res.status(204).json({ message: 'Grocery item removed successfully' });
    } catch (error) {
      res.status(400).json({ message: 'Error removing grocery item' });
      console.log(error)
    }
  };

  updateItem = async (req: Request, res: Response) => {
    const updateItem = req.body;
    try {
      const updatedItem = await this.itemService.updateItem(updateItem);
      res.json(updatedItem);
    } catch (error) {
      res.status(400).json({ message: 'Error updating grocery item details' });
    }
  }
}
