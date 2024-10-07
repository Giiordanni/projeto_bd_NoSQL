import {Rpouter} from "express"
import PacienteController from "../controllers/paciente.controller.js";

const pacienteRouter = Router();

pacienteRouter.post("api/paciente", PacienteController.create);
pacienteRouter.get("api/paciente", PacienteController.findAll);
pacienteRouter.get("api/paciente/:email", PacienteController.findOne);
pacienteRouter.post("api/login/paciente", PacienteController.login);

export default pacienteRouter;