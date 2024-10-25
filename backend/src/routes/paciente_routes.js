import {Router} from "express"
import PacienteController from "../controllers/paciente.controller.js";
import globalMiddlewares from "../middlewares/global.middlewares.js";

const pacienteRouter = Router();

pacienteRouter.post("/api/paciente", PacienteController.create);
pacienteRouter.get("/api/paciente", PacienteController.findAll);
pacienteRouter.get("/api/paciente/:email", PacienteController.findOne);
pacienteRouter.post("/api/login/paciente", PacienteController.login);
pacienteRouter.patch("/api/paciente", globalMiddlewares.jwtRequired, PacienteController.patchPaciente);
pacienteRouter.delete("/api/paciente", globalMiddlewares.jwtRequired, PacienteController.deletePaciente);

export default pacienteRouter;