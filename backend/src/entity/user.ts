import {
    BaseEntity,
    Column,
    Entity,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import {OrderSchema} from "./order";

@Entity({name: "users"})
export class UserSchema extends BaseEntity {
    @PrimaryGeneratedColumn("uuid", {name: "id"})
    id: string;

    @Column({name: "username", unique: true})
    username: string;

    @Column({name: "email", unique: true})
    email: string;

    @Column({name: "password"})
    password: string;


    @OneToMany(() => OrderSchema, (item) => item.user)
    orders?: OrderSchema[];
}
