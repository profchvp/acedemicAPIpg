import { Router } from "express";
import controllerDashboard from "../controllers/controller.dashboard.js";

const routeDashboard = Router();

routeDashboard.get("/dashboard/resumos", controllerDashboard.DashboardResumos);
routeDashboard.get("/dashboard/negocios", controllerDashboard.DashboardNegociosAnual);

export default routeDashboard;