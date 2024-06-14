import {
    BaseEntity,
    Column, CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import {ItemSchema} from "./item";
import {UserSchema} from "./user";

export enum Status {
    Finished = "finished",
}

@Entity({name: "orders"})
export class OrderSchema extends BaseEntity {
    @PrimaryGeneratedColumn("uuid", {name: "id"})
    id: string;

    @Column({name: "user_id", nullable: true})
    userId: number;

    @Column({name: "total", type: "decimal"})
    total: number;

    @CreateDateColumn({ type: "timestamp with time zone" })
    createdAt?: Date;

    @Column({name: "status", type: "enum", enum: Status})
    status?: Status;

    @OneToMany(() => ItemSchema, (item) => item.order, { cascade: true })
    items?: ItemSchema[];

    @ManyToOne(() => UserSchema)
    @JoinColumn({name: "user_id", referencedColumnName: "id"})
    user?: UserSchema;
}
