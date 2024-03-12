export interface CreateOrderItemDto {
    itemId: number;
    quantity: number;
}

export interface CreateOrderDto {
    userId: number;
    items: CreateOrderItemDto[];
}
