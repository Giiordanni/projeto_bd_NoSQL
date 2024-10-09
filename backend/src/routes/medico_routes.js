import { Router } from "express";
import MedicoController from "../controllers/medico_controller.js";
import roles from "../middlewares/role_middlwares.js";
import globalMiddlwares from '../middlewares/global.middlewares.js'


const MedicoRouter = Router();

MedicoRouter.post("/api/medico/:role", MedicoController.create);
MedicoRouter.get("/api/medicos", MedicoController.findAllMedicos);
MedicoRouter.get("/api/medico/email", MedicoController.findOneByEmail);
MedicoRouter.get("/api/medico/nome", MedicoController.findNome);
MedicoRouter.get("/api/medico/especialidade", MedicoController.findByEspecialidade);
MedicoRouter.post("/api/login/medico", MedicoController.login);
MedicoRouter.delete("/api/delete/medico", globalMiddlwares.jwtRequired, MedicoController.deletarMedico);
MedicoRouter.put("/api/updatePut/medico", MedicoController.updateMedico);
MedicoRouter.patch("/api/update/medico", globalMiddlwares.jwtRequired, roles.isMedico, MedicoController.updateMedico);

export default MedicoRouter;
