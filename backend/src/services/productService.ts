import {GenericService} from "./genericService";
import {ProductSchema} from "../entity/product";
import Stripe from "stripe";
export class ProductService extends GenericService<ProductSchema> {
    constructor() {
        super(ProductSchema);
    }

    async handlePurchaseTransaction(items: Stripe.ApiList<any>) {
        for (const item of items.data) {
            const product = await this.repository.findOneBy({
                priceId: item.price.id,
            });
            if (product) {
                product.stock -= item.quantity;
                await this.repository.save(product);
                console.log(`Stock updated for product ${product.id}`);
            }
        }
    }


}