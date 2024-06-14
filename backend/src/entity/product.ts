import {Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity} from "typeorm";
import {ItemSchema} from "./item";

export enum Category {
    Electronics = "Electronics",
    Fashion = "Fashion",
    Home = "Home",
    Beauty = "Beauty",
    Sports = "Sports",
    Other = "Other",
}

@Entity("products")
export class ProductSchema extends BaseEntity {
    @PrimaryGeneratedColumn("uuid", {
        name: "id",
    })
    id: string;

    @Column({
        name: "name",
    })
    name: string;

    @Column({
        name: "price",
        type: "decimal",
    })
    price: number;

    @Column({
        name: "description",
    })
    description?: string;

    @Column({
        name: "stock",
    })
    stock: number;

    @Column({
        name: "price_id",
        nullable: true,
    })
    priceId: string;

    @Column({name: "category", type: "enum", enum: Category})
    category?: Category;

    @Column({
        name: "image_url",
    })
    imageUrl?: string;

    @Column({
        name: "active",
    })
    isActive?: boolean;

    @OneToMany(() => ItemSchema, (cartItem) => cartItem.product, {
        cascade: true,
    })
    items: ItemSchema[];

}
