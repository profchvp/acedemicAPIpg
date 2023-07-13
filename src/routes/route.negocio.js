import { Router } from "express";
import controllerNegocio from "../controllers/controller.negocio.js";


const routeNegocio = Router();
console.log("routerr...")
routeNegocio.get("/negocios", controllerNegocio.Listar);
routeNegocio.get("/negocios/:id_negocio", controllerNegocio.ListarId);
routeNegocio.post("/negocios", controllerNegocio.Inserir);
routeNegocio.put("/negocios/:id_negocio", controllerNegocio.Editar);
routeNegocio.delete("/negocios/:id_negocio", controllerNegocio.Excluir);

export default routeNegocio;
