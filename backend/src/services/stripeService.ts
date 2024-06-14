import {Request, Response} from "express";
import Stripe from "stripe";
import {OrderService} from "./orderService";
const orderService = new OrderService();
export class StripeService {
    stripe = new Stripe(process.env.STRIPE_SECRET || "");
    async createCheckoutSession(req: Request, res: Response) {
        const {line_items, customer_email} = req.body;

        const session = await this.stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: line_items,
            mode: "payment",
            success_url: `http://localhost:3000/purchase`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel.html`,
            customer_email: customer_email,
        });
        res.json({url: session.url});
    }

    async processStripeCheckout(req: Request, res: Response) {
        const sig: string | string[] = req.headers["stripe-signature"] || "";
        try {
            console.log('Stripe request', req.body, sig)
            const event = this.stripe.webhooks.constructEvent(
                req.body,
                sig,
                process.env.STRIPE_WEBHOOK_SECRET || ""
            );
            console.log('Event', event)
            switch (event.type) {
                case "checkout.session.completed":
                    const session = event.data.object;
                    const items = await this.stripe.checkout.sessions.listLineItems(session.id);
                    console.log('Items', items)
                    if (items && session.customer_email) {
                        await orderService.createPurchaseRecord(items, session.customer_email);
                    }
                    break;
                default:
                    console.log(`Unhandled event type ${event.type}`);
            }
            res.json({received: true});
        } catch (error) {
            console.error(error);
            res.status(500).json({message: "Internal server error."})
        }
    }
}