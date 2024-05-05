import { PrimaryGeneratedColumn, Entity, Column } from "typeorm";

@Entity({ name: "products" })
export class Products {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string

  @Column() 
  price: number
}