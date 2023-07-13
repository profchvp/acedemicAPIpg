import {db} from "../config/database.js";

import pkg from 'pg'
function Listar(callback) {
    const{Client}=pkg
    const client = new Client({
        host: "localhost",
        user: "postgres",
        port: "5432",
        password: "admin",
        database: "crm"
    })
    client.connect();
   
    client.query(`select * from tab_etapa order by ordem`, (err, res)=>{
        if (err) {
            callback(err, []);
        } else {
            callback(undefined, res.rows);
        }
        client.end
    })
    //let ssql = "select * from tab_etapa order by ordem";
//
  //  db.query(ssql, (err, result)=>{
    //    if (err){
      //      callback(err, []);
      //  } else {
       //     callback(undefined, result);
       // }
    //});
    
}

export default {Listar};