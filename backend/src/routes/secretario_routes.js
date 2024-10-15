import {Router} from "express";
import UserController from "../controllers/secretario.controller.js";
import midd from "../middlewares/global.middlewares.js";


const userRouter = Router();

userRouter.post("/api/secretario/:role", UserController.createSec);
userRouter.get("/api/secretario", UserController.findAllSec);
userRouter.get("/api/secretario/:id", UserController.findOneById)
userRouter.post("/api/login/secretario", UserController.loginSec);
userRouter.patch("/api/update/secretario", midd.isSecretaria, UserController.updateSec);
userRouter.delete("/api/delete/secretario/:id",  midd.jwtRequired, midd.isSecretaria, UserController.deleteSec);
userRouter.post("/api/logout/secretario", midd.isSecretaria, midd.jwtRequired ,UserController.logOutSec);


export default userRouter;
