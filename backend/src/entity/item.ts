import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import {ProductSchema} from "./product";
import {OrderSchema} from "./order";

@Entity({name: "items"})
export class ItemSchema extends BaseEntity {
    @PrimaryGeneratedColumn("uuid", {name: "id"})
    id: string;


    @Column({name: "order_id", nullable: true})
    orderId: number;

    @Column({name: "product_id"})
    productId: number;

    @Column({name: "quantity"})
    quantity: number;

    @Column({name: "price", type: "decimal"})
    price: number;


    @ManyToOne(() => OrderSchema)
    @JoinColumn({name: "order_id", referencedColumnName: "id"})
    order?: OrderSchema;

    @ManyToOne(() => ProductSchema)
    @JoinColumn({name: "product_id", referencedColumnName: "id"})
    product?: ProductSchema;
}
