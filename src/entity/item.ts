import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price!: number;

  @Column()
  description!: string;

  @Column()
  category!: string;

  @Column()
  available!: boolean;

  @Column('int')
  quantity_available!: number;

  @Column({ type: 'text', nullable: true })
  imageUrl: string | undefined;
}
