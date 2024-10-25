import clinica_controller from "../controllers/clinica_controller.js";
import globalMiddlewares from "../middlewares/global.middlewares.js";
import { Router } from "express";

const clinicaRouter = Router();

clinicaRouter.post("/api/clinica", globalMiddlewares.jwtRequired, globalMiddlewares.isMedicoOrSecretaria,  clinica_controller.createClinica);
clinicaRouter.get("/api/clinicas", globalMiddlewares.jwtRequired, clinica_controller.findAllClinicas);
clinicaRouter.get("/api/clinica/medico/:nome", globalMiddlewares.jwtRequired, clinica_controller.findByNomeMedico);
clinicaRouter.get("/api/clinica/especialidade/:especialidade", globalMiddlewares.jwtRequired, clinica_controller.findByEspecialidade);
clinicaRouter.get("/api/clinica/:nome", globalMiddlewares.jwtRequired, clinica_controller.findByNomeClinica);
clinicaRouter.delete("/api/clinica/:id", globalMiddlewares.jwtRequired, globalMiddlewares.isMedicoOrSecretaria, clinica_controller.deleteClinica);
clinicaRouter.patch("/api/clinica/:id", globalMiddlewares.jwtRequired, globalMiddlewares.isMedicoOrSecretaria, clinica_controller.patchDataClinica);

export default clinicaRouter;
