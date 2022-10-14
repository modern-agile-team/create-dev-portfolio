import mysql from 'mysql2';
import 'dotenv/config';

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PSWORD,
  database: process.env.DB_DATABASE,
  port: Number(process.env.DB_PORT),
  connectionLimit: 300,
};

const mysqlPool = mysql.createPool(config);

const db = mysqlPool.promise();

export default db;
