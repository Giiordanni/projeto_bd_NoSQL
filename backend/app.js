import express from "express";
import dotenv from "dotenv";
import connectdataBase from "./src/database/db.js";
import router_sec from "./src/routes/secretario_routes.js";
import router_pac from "./src/routes/paciente_routes.js";
import router_med from "./src/routes/medico_routes.js";
import router_clin from "./src/routes/clinica_routes.js";
import router_agenda from "./src/routes/agenda_routes.js";

dotenv.config();

const app = express();

connectdataBase()
app.use(express.json());
app.use(router_sec);
app.use(router_pac);
app.use(router_med);
app.use(router_clin);
app.use(router_agenda);

export default app;
