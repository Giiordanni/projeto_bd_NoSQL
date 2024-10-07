import { Router } from "express";
import MedicoController from "../controllers/medico.controller.js";


const MedicoRouter = Router();

MedicoRouter.post("/api/medico", MedicoController.create);
MedicoRouter.get("/api/medico", MedicoController.findAll);
MedicoRouter.get("/api/medico/:email", MedicoController.findOne);
MedicoRouter.post("/api/login/medico", MedicoController.login);

export default MedicoRouter;
