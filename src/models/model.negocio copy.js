//import {db, executeQuery} from "../config/database.js";
import { db } from "../config/database.js";
function Listar(id_usuario, etapa, callback) {

    let filtro = [id_usuario];
    let ssql = "select * from tab_negocio where id_usuario = ? ";

    if (etapa){
        ssql += "and etapa = ? "
        filtro.push(etapa)
    }

    ssql += "order by id_negocio desc "
    
    db.query(ssql, filtro, function(err, result){
        if (err){
            callback(err, []);
        } else {
            callback(undefined, result);
        }
    });
    
}

function ListarPaginado(id_usuario, etapa, pagina, qtd_reg_pagina, callback) {

    let qtd_pular = (pagina - 1) * qtd_reg_pagina;
    let filtro = [id_usuario];
    let ssql = "select * from tab_negocio where id_usuario = ? ";

    if (etapa){
        ssql += "and etapa = ? "
        filtro.push(etapa)
    }

    ssql += "order by id_negocio desc "

    // Paginacao...
    ssql += "limit ?, ? "
    filtro.push(qtd_pular);
    filtro.push(parseInt(qtd_reg_pagina));
    
    db.query(ssql, filtro, function(err, result){
        if (err){
            callback(err, []);
        } else {
            callback(undefined, result);
        }
    });
    
}

function ListarId(id_negocio, callback) {
    
    let ssql = "select * from tab_negocio where id_negocio = ? ";
   
    db.query(ssql, [id_negocio], function(err, result){
        if (err){
            callback(err, []);
        } else {
            callback(undefined, result[0]);
        }
    });
    
}

function Inserir(json_neg, callback) {
    
    let ssql = "insert into tab_negocio(id_usuario, etapa, descricao, empresa, ";
    ssql += "contato, fone, email, valor, dt_cadastro) ";
    ssql += "values(?, ?, ?, ?, ?, ?, ?, ?, current_timestamp()) ";   
   
    db.query(ssql, [json_neg.id_usuario, json_neg.etapa, json_neg.descricao,
        json_neg.empresa, json_neg.contato, json_neg.fone, json_neg.email,
        json_neg.valor], function(err, result){
        if (err){
            callback(err, []);
        } else {
            callback(undefined, {id_negocio: result.insertId});
        }
    });
    
}

function Editar(id_negocio, json_neg, callback) {
    
    let ssql = "update tab_negocio set etapa=?, descricao=?, ";
    ssql += "empresa=?, contato=?, fone=?, email=?, valor=? ";
    ssql += "where id_negocio=? "; 
   
    db.query(ssql, [json_neg.etapa, json_neg.descricao,
        json_neg.empresa, json_neg.contato, json_neg.fone, json_neg.email,
        json_neg.valor, id_negocio], function(err, result){
        if (err){
            callback(err, []);
        } else {
            callback(undefined, {id_negocio: id_negocio});
        }
    });
    
}

function Excluir(id_negocio, callback) {
    
   
    db.getConnection(function(err, conn){

        conn.beginTransaction(async function(err){

            try {
                // Tarefas...
                let ssql = "delete from tab_negocio_tarefa where id_negocio=?";
                await executeQuery(conn, ssql, [id_negocio]);

                // Negocios...
                ssql = "delete from tab_negocio where id_negocio=?";
                await executeQuery(conn, ssql, [id_negocio]);

                conn.commit();
                callback(undefined, {id_negocio: id_negocio});

            } catch(e) {
                conn.rollback();
                callback(e, {});
            }

            conn.release();

        });

    });
    
}

export default {Listar, ListarPaginado, ListarId, Inserir, Editar, Excluir};
