import {db} from "../config/database.js";
 
function Listar(callback) {

    let ssql = "select * from tab_etapa order by ordem";

    db.query(ssql, function(err, result){
        if (err){
            callback(err, []);
        } else {
            callback(undefined, result.rows);
        }
    });
    
}

export default {Listar};