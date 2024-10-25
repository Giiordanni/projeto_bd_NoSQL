import agenda_controller from "../controllers/agenda_controller.js";
import {Router} from "express";
import globalMiddlewares from "../middlewares/global.middlewares.js";


const router = Router();

router.post("/api/agenda", globalMiddlewares.jwtRequired, globalMiddlewares.isMedicoOrSecretaria, agenda_controller.criarAgenda);
router.get("/api/agenda", globalMiddlewares.jwtRequired, agenda_controller.findAllAgendas);
router.get("/api/agenda/data/:data", globalMiddlewares.jwtRequired, agenda_controller.findByData);
router.get("/api/agenda/turno/:turno", globalMiddlewares.jwtRequired, agenda_controller.findByTurno);
router.patch("/api/agenda/:id", globalMiddlewares.jwtRequired, globalMiddlewares.isMedicoOrSecretaria, agenda_controller.updateAgenda);
router.delete("/api/agenda/:id", globalMiddlewares.jwtRequired, globalMiddlewares.isMedicoOrSecretaria, agenda_controller.deleteAgenda);

export default router;