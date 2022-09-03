"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = __importDefault(require("mysql2"));
require("dotenv/config");
const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PSWORD,
    database: process.env.DB_DATABASE,
    port: 3306,
    connectionLimit: 10,
};
const mysqlPool = mysql2_1.default.createPool(config);
const db = mysqlPool.promise();
exports.default = db;
