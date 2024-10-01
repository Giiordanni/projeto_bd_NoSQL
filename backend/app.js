import express from "express";
import dotenv from "dotenv";
import connectdataBase from "./src/database/db.js";
import router_sec from "./src/routes/secretario_routes.js";

dotenv.config();

const app = express();

connectdataBase()
app.use(express.json());
app.use(router_sec);


export default app;
