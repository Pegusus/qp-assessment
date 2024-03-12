import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import { OrderItem } from './orderItem';

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    userId!: number;

    @CreateDateColumn()
    createdAt!: Date;

    @OneToMany(() => OrderItem, orderItem => orderItem.order, {
        cascade: true,
    })
    orderItems!: OrderItem[];
}
