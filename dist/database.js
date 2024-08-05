"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
const keys_1 = __importDefault(require("./keys"));
const pool = mysql_1.default.createPool({
    host: keys_1.default.database.host,
    user: keys_1.default.database.user,
    password: keys_1.default.database.password,
    database: keys_1.default.database.database,
    port: keys_1.default.database.port,
    ssl: { rejectUnauthorized: false }
});
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    if (connection)
        connection.release();
    console.log('DB Connected!');
});
exports.default = pool;
