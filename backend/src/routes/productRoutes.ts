import {Router} from "express";
import {ProductService} from "../services/productService";

const productRouter = Router();
const service = new ProductService();

productRouter.get("", service.getAll.bind(service));
productRouter.get("/:id", service.getById.bind(service));
productRouter.post("", service.create.bind(service));
productRouter.put("/:id", service.update.bind(service));
productRouter.delete("/:id", service.delete.bind(service));

export default productRouter;

