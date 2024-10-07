import { Router } from "express";
import MedicoController from "../controllers/medico_controller.js";


const MedicoRouter = Router();

MedicoRouter.post("/api/medico", MedicoController.create);
MedicoRouter.get("/api/medicos", MedicoController.findAllMedicos);
MedicoRouter.get("/api/medico/:email", MedicoController.findOne);
MedicoRouter.post("/api/login/medico", MedicoController.login);
MedicoRouter.delete("/api/delete/medico", MedicoController.deletarMedico);

export default MedicoRouter;
