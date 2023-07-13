import modelNegocio from "../models/model.negocio.js";


function Listar(request, response) {

    // Query String...
    // http://localhost:3001/negocios?id_usuario=1&etapa=Teste
    // http://localhost:3001/negocios?id_usuario=1&etapa=Teste&pagina=2&qtd_reg_pagina=50

    let id_usuario = request.query.id_usuario;
    let etapa = request.query.etapa;
    let pagina = request.query.pagina;
    let qtd_reg_pagina = request.query.qtd_reg_pagina;
console.log("Listar...")
    if (pagina) {
        modelNegocio.ListarPaginado(id_usuario, etapa, pagina, qtd_reg_pagina, function (err, result) {
            if (err) {
                response.status(500).send(err);
            } else {
                response.status(200).send(result);
            }
        });
    } else {
        console.log("Listar...por id"+id_usuario)
        modelNegocio.Listar(id_usuario, etapa, function (err, result) {
            if (err) {
                response.status(500).send(err);
            } else {
                response.status(200).send(result);
            }
        });
    }
}

function ListarId(request, response) {

    // URI Params...
    // http://localhost:3001/negocios/123

    modelNegocio.ListarId(request.params.id_negocio, function (err, result) {
        if (err) {
            response.status(500).send(err);
        } else {
            response.status(200).send(result);
        }
    });
}

function Inserir(request, response) {

    // POST (dados no body)
    // http://localhost:3001/negocios

    modelNegocio.Inserir(request.body, function (err, result) {
        if (err) {
            response.status(500).send(err);
        } else {
            response.status(201).send(result);
        }
    });
}

function Editar(request, response) {

    // PUT (dados no body)
    // http://localhost:3001/negocios/10

    modelNegocio.Editar(request.params.id_negocio, request.body, function (err, result) {
        if (err) {
            response.status(500).send(err);
        } else {
            response.status(200).send(result);
        }
    });
}

function Excluir(request, response) {

    // DELETE
    // http://localhost:3001/negocios/10

    modelNegocio.Excluir(request.params.id_negocio, function (err, result) {
        if (err) {
            response.status(500).send(err);
        } else {
            response.status(200).send(result);
        }
    });
}

export default {  Listar, ListarId, Inserir, Editar, Excluir };