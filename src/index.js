import express from "express";
import cors from "cors";
import basicAuth from "express-basic-auth";

import routeEtapa from "./routes/route.etapa.js";
import routeNegocio from "./routes/route.negocio.js";
import routeDashboard from "./routes/route.dashboard.js";
const app = express();

// Middleware JSON...
app.use(express.json());

// Middleware CORS...
app.use(cors());

// Middleware Basic Auth...
app.use(basicAuth({
    authorizer: function(usuario, senha){
        return basicAuth.safeCompare(usuario, "99coders") && basicAuth.safeCompare(senha, "112233");
    }
}));

/*
app.get("/ping", (request, response) => {
    return response.status(200).send("Pong...");
});
*/
// Rotas...
app.use(routeEtapa);
app.use(routeNegocio);
app.use(routeDashboard);



const   port = 3333;

app.listen(port, () => {
    console.log("Servidor rodando na porta: " + port);
});



