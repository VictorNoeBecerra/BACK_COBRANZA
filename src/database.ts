import mysql from 'mysql';
import keys from './keys';

const pool = mysql.createPool({
    host: keys.database.host,
    user: keys.database.user,
    password: keys.database.password,
    database: keys.database.database,
    port: keys.database.port,
    ssl: keys.database.ssl ? { rejectUnauthorized: true } : undefined
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    if (connection) connection.release();
    console.log('DB Connected!');
});

export default pool;
