import {Router} from "express";
import UserController from "../controllers/secretario.controller.js";
import midd from "../middlewares/global.middlewares.js";


const userRouter = Router();

userRouter.post("/api/secretario", UserController.createSec);
userRouter.get("/api/secretario", UserController.findAllSec);
userRouter.get("/api/secretario/:id", UserController.findOneById)
userRouter.post("/api/login/secretario", UserController.loginSec);
userRouter.patch("/api/update/secretario", midd.jwtRequired, UserController.updateSec);
userRouter.delete("/api/delete/secretario",  midd.jwtRequired, UserController.deleteSec);

export default userRouter;
