import { Router } from "express";
import controllerEtapa from "../controllers/controller.etapa.js";


const routeEtapa = Router();

routeEtapa.get("/etapas", controllerEtapa.Listar);

export default routeEtapa;
