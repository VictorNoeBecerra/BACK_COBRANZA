// api buena
export default {
    database: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: parseInt(process.env.DB_PORT || '3306', 10),
        ssl: process.env.DB_SSL === 'true'
    }
};

// "use strict";

// export default{
//     database:{
//         host:'localhost',
//         user:'root',
//         password:'elementplanb',
//         database:'db_lacteos'
//     }
// }

// export default{
//     database:{
//         host:'database-1.cogth21xeakv.us-east-2.rds.amazonaws.com',
//         user:'admin',
//         password:'password',
//         database:'sello_rojo_db'
//     }
// }