import {GenericService} from "./genericService";
import {OrderSchema, Status} from "../entity/order";
import AppDataSource from "../database";
import Stripe from "stripe";
import {ItemSchema} from "../entity/item";
import {UserSchema} from "../entity/user";
import {ProductSchema} from "../entity/product";
import {ProductService} from "../services/productService";
import {getUserIdFromToken} from "../middleware/authentication";
import {Request, Response} from "express";

export class OrderService extends GenericService<OrderSchema> {
    productService = new ProductService();

    constructor() {
        super(OrderSchema);
    }

    async getAll(req: Request, res: Response) {
        const userId = getUserIdFromToken(req);
        const userPurchases = await this.repository.find({
            where: {user: {id: userId}},
            relations: ["items", "items.product"],
        });
        if (!userPurchases) {
            res.status(404).json({message: "No purchases found for this user"});
        }
        res.json(userPurchases);
    }

    async getById(req: Request, res: Response) {
        const userId = getUserIdFromToken(req);
        console.log(userId)
        const {id} = req.params;
        const order = await this.repository.findOne({
            where: {user: {id: userId}, id},
            relations: ["items", "items.product"],
        });
        if (!order) {
            res.status(404).json({message: "Order not found"});
        }
        res.json(order);
    }

    async createPurchaseRecord(
        lineItems: Stripe.ApiList<any>,
        customerId: string
    ) {
        await this.productService.handlePurchaseTransaction(lineItems);
        const order = new OrderSchema();
        order.total = lineItems.data.reduce(
            (sum, item) => sum + (item.price.unit_amount * item.quantity) / 100,
            0
        );
        const user = await AppDataSource.getRepository(UserSchema).findOneBy({
            email: customerId,
        });
        if (!user) {
            throw new Error("User not found");
        }
        order.user = user;
        order.items = [];
        order.status = "finished" as Status;
        for (const item of lineItems.data) {
            const product = await AppDataSource.getRepository(ProductSchema).findOneBy({
                priceId: item.price.id,
            });
            if (!product) {
                throw new Error("Product not found");
            }
            const purchaseItem = new ItemSchema();
            purchaseItem.product = product;
            purchaseItem.quantity = item.quantity;
            purchaseItem.price = item.price.unit_amount / 100;
            order.items.push(purchaseItem);
        }
        await AppDataSource.getRepository(OrderSchema).save(order);
    }

}