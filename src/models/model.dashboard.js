import {db} from "../config/database.js";

function DashboardResumos(id_usuario, callback){
    
    let json = {};
    let ssql = "select sum(valor) as valor_mes, count(*) as qtd_mes ";
    ssql += "from tab_negocio ";
   // ssql += "where dt_cadastro >= DATE_FORMAT(NOW(), '%Y-%m-01') ";
    //ssql += "and dt_cadastro <= DATE_FORMAT(LAST_DAY(NOW()), '%Y-%m-%d') ";
    ssql += "where id_usuario = $1 ";

          console.log(ssql)     
    db.query(ssql, [id_usuario], function(err, result) {
        if (err) {            
             callback(err, []);
        } else {
             
            json.valor_mes = result.rows[0].valor_mes;
            json.qtd_mes = result.rows[0].qtd_mes;

            ssql = "select  sum(valor) as valor_dia, count(*) as qtd_dia ";
            ssql += "from tab_negocio ";
            
            ssql += "where id_usuario = $1 ";    
            console.log("SQL@2: "+ssql)        
//            ssql += "where dt_cadastro >= DATE_FORMAT(NOW(), '%Y-%m-%d') ";
//            ssql += "and dt_cadastro < DATE_FORMAT(NOW() + INTERVAL 1 DAY, '%Y-%m-%d') ";
            db.query(ssql, [id_usuario], function(err, result) {
                if (err) {            
                     callback(err, []);
                } else {                        

                    json.valor_dia = result.rows[0].valor_dia;
                    json.qtd_dia = result.rows[0].qtd_dia;

                    callback(undefined, json);
                }
            });
        }
    
    });        
}

function DashboardNegociosAnual(callback){

    let filtro = [];    
    let ssql = "select month(dt_cadastro) as mes, sum(valor) as vl_total ";
    ssql += "from  tab_negocio ";
    ssql += "where   dt_cadastro >= DATE_FORMAT(NOW() - INTERVAL 11 MONTH, '%Y-%m-%d') ";
    ssql += "group by month(dt_cadastro) ";
    ssql += "order by 1 ";
               
    db.query(ssql, filtro, function(err, result) {
        if (err) {            
             callback(err, []);
        } else {                   
            
            // Titulos...
            let json = [["Mês", "Valor"]];

            // Valores...
            result.map((r) => {
                json.push([r.mes, r.vl_total]);
            })
            
             callback(undefined, json);
        }
    });        
}






export default {DashboardResumos, DashboardNegociosAnual};