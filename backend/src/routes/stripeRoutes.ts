import express, {Router} from "express";
import {StripeService} from "../services/stripeService";

const stripeRoutes = Router();

const service = new StripeService();

stripeRoutes.post("/create-checkout", express.json(),
    service.createCheckoutSession.bind(service));
stripeRoutes.post("/webhook", express.raw({type: "application/json"}),
    service.processStripeCheckout.bind(service));
export default stripeRoutes;