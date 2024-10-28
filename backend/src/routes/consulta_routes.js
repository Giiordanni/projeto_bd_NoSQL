import consultaController from "../controllers/consulta_controller.js";
import {Router} from "express";    
import globalMidlleware from "../middlewares/global.middlewares.js";

const consultaRouter = Router();   

consultaRouter.post("/api/consulta", globalMidlleware.jwtRequired, consultaController.createConsulta);
consultaRouter.get("/api/consulta", globalMidlleware.jwtRequired, consultaController.findAllConsultas);
consultaRouter.get("/api/consulta/data", globalMidlleware.jwtRequired, consultaController.findByData);
consultaRouter.patch("/api/consulta/status", globalMidlleware.jwtRequired, globalMidlleware.isMedicoOrSecretaria, consultaController.updateConsultasStatus);
consultaRouter.patch("/api/consulta/:id", globalMidlleware.jwtRequired, consultaController.updateConsulta);

consultaRouter.delete("/api/consulta/:id", globalMidlleware.jwtRequired, consultaController.deleteConsulta);

export default consultaRouter;