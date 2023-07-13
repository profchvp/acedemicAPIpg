import modelEtapa from "../models/model.etapa.js";

function Listar(request, response) {

    modelEtapa.Listar(function(err, result){
        if (err) {
            response.status(500).send(err);
        } else {
            response.status(200).send(result);
        }
    });
    
}

export default {Listar};