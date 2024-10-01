import {Router} from "express";
import UserController from "../controllers/secretario.controller.js";


const userRouter = Router();

userRouter.post("/api/secretario", UserController.create);
userRouter.get("/api/secretario", UserController.findAll);
userRouter.get("/api/secretario/:email", UserController.findOne)
userRouter.post("/api/login/secretario", UserController.login);



export default userRouter;
