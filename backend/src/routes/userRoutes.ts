import {Router} from "express";
import {UserService} from "../services/userService";

const userRouter = Router();
const service = new UserService();

userRouter.get("/validate_token", service.isTokenValid.bind(service));
userRouter.post("/signup", service.signup.bind(service));
userRouter.post("/login", service.login.bind(service));

userRouter.put("/:id", service.update.bind(service))

export default userRouter;
