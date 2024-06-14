import {Router} from "express";
import {OrderService} from "../services/orderService";

const orderRouter = Router();
const service = new OrderService();

orderRouter.get("/", service.getAll.bind(service));
orderRouter.get("/:id", service.getById.bind(service));

export default orderRouter;