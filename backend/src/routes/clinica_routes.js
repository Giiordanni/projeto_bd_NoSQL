import clinica_controller from "../controllers/clinica_controller.js";
import globalMiddlewares from "../middlewares/global.middlewares.js";
import { Router } from "express";

const clinicaRouter = Router();

clinicaRouter.post("/api/clinica", globalMiddlewares.jwtRequired, globalMiddlewares.isMedico || globalMiddlewares.isSecretaria,  clinica_controller.createClinica);
clinicaRouter.get("/api/clinicas", clinica_controller.findAllClinicas);
clinicaRouter.get("/api/clinica/nome/:nome", clinica_controller.findByNome);
clinicaRouter.get("/api/clinica/especialidade/:especialidade", clinica_controller.findByEspecialidade);
clinicaRouter.delete("/api/clinica/:id", globalMiddlewares.jwtRequired, globalMiddlewares.isMedico, globalMiddlewares.isSecretaria, clinica_controller.deleteClinica);
clinicaRouter.patch("/api/clinica/:id", globalMiddlewares.jwtRequired, globalMiddlewares.isMedico, globalMiddlewares.isSecretaria, clinica_controller.patchDataClinica);

export default clinicaRouter;
