
import {db, executeQuery} from "../config/database.js";
function Listar(id_usuario, etapa, callback) {

    let filtro = [id_usuario];
    let ssql = "select * from tab_negocio where id_usuario = $1 ";

    if (etapa) {
        ssql += "and etapa = $2 "
        filtro.push(etapa)
    }

    ssql += "order by id_negocio desc "

    db.query(ssql, filtro, function (err, result) {
        if (err) {
            console.log("erro no acesso: "+err )
            callback(err, []);
        } else {
            callback(undefined, result.rows);
        }
    });

}

function ListarPaginado(id_usuario, etapa, pagina, qtd_reg_pagina, callback) {

    let qtd_pular = (pagina - 1) * qtd_reg_pagina;
    let filtro = [id_usuario];
    let ssql = "select * from tab_negocio where id_usuario = $1 ";

    if (etapa) {
        ssql += "and etapa = $2 "
        filtro.push(etapa)
    }

    ssql += "order by id_negocio desc "



    db.query(ssql, filtro, function (err, result) {
        if (err) {
            callback(err, []);
        } else {
            let json = { total_registros: result.rows.length }
         //   return callback(undefined, json);
            // Paginacao...
            ssql += "limit $1, $2 "
            filtro.push(qtd_pular);
            filtro.push(parseInt(qtd_reg_pagina));

            db.query(ssql, filtro, function (err, result) {
                if (err) {
                    callback(err, []);
                } else {
                    json.dados = result.rows;
                    callback(undefined, json);
                }
            });
        }
    })
}

    function ListarId(id_negocio, callback) {

        let ssql = "select * from tab_negocio where id_negocio = $1 ";

        db.query(ssql, [id_negocio], function (err, result) {
            if (err) {
                callback(err, []);
            } else {
                callback(undefined, result.rows[0]);
            }
        });

    }

    function Inserir(json_neg, callback) {

        let ssql = "insert into tab_negocio(id_usuario, etapa, descricao, empresa, ";
        ssql += "contato, fone, email, valor, dt_cadastro) ";
        ssql += "values($1, $2, $3, $4, $5, $6, $7, $8, current_timestamp) RETURNING id_negocio";

        db.query(ssql, [json_neg.id_usuario, json_neg.etapa, json_neg.descricao,
        json_neg.empresa, json_neg.contato, json_neg.fone, json_neg.email,
        json_neg.valor], function (err, result) {
            if (err) {
                callback(err, []);
            } else {
                const insertId = result.rows[0].id_negocio;
                callback(undefined, { insertId });
                                    
            }
        });

    }

    function Editar(id_negocio, json_neg, callback) {

        let ssql = "update tab_negocio set etapa=$1, descricao=$2, ";
        ssql += "empresa=$3, contato=$4, fone=$5, email=$6, valor=$7 ";
        ssql += "where id_negocio=$8 ";

        db.query(ssql, [json_neg.etapa, json_neg.descricao,
        json_neg.empresa, json_neg.contato, json_neg.fone, json_neg.email,
        json_neg.valor, id_negocio], function (err, result) {
            if (err) {
                callback(err, []);
            } else {
                callback(undefined, { id_negocio: id_negocio });
            }
        });

    }

  async   function Excluir(id_negocio, callback) {


    //    db.getConnection(function (err, conn) {

//            db.beginTransaction(async function (err) {

                try {
                    // Tarefas...
                    let ssql = "delete from tab_negocio_tarefa where id_negocio=$1";
                    await executeQuery(db, ssql, [id_negocio]);

                    // Negocios...
                    ssql = "delete from tab_negocio where id_negocio=$1";
                    await executeQuery(db, ssql, [id_negocio]);

                    conn.commit();
                    callback(undefined, { id_negocio: id_negocio });

                } catch (e) {
                   // db.rollback();
                    callback(e, {});
                }

                db.release();

  //          });

      //  });

    }

    export default { Listar, ListarPaginado, ListarId, Inserir, Editar, Excluir };