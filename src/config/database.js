import pg from "pg";
const { Pool } = pg;

// Conexao banco...

/* xxxxxxxxxxxxxxxxxxxxxxxxDesenvolvimentoxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
const db = new Pool({
    user: 'postgres',
    password: 'admin',
    host: 'localhost',
    database: 'crm',
    max: 10, // limite de conexões simultâneas
  });
*/  
const db = new Pool({
    user: 'postgres',
    password: 'D9m7JegAv4oYIhZrgm2e',
    host: 'postgresql://postgres:D9m7JegAv4oYIhZrgm2e@containers-us-west-114.railway.app:6094/railway',
    database: 'railway',
    max: 10, // limite de conexões simultâneas
  });
async function executeQuery(connection, query, parameters) {
    return new Promise((resolve, reject) => {
        connection.query(query, parameters, (err, result) => {
             if (err) {
                 return reject(err);                 
             } else {
                return resolve(result);
             }             
        });
    });
 }

 export {db, executeQuery}