"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../config/db"));
const error_1 = require("../service/error");
class VisitorRepository {
    getVisitorCnt() {
        return __awaiter(this, void 0, void 0, function* () {
            let conn;
            try {
                conn = yield db_1.default.getConnection();
                const query = `
        SELECT today_count AS todayCount, total_count AS totalCount 
        FROM number_of_visitors 
        WHERE visitor_id = 1`;
                const [rows] = yield conn.execute(query);
                return rows[0];
            }
            catch (error) {
                throw new error_1.ServerError('Database Error Occurred');
            }
            finally {
                conn === null || conn === void 0 ? void 0 : conn.release();
            }
        });
    }
    updateTodayVisitorCnt() {
        return __awaiter(this, void 0, void 0, function* () {
            let conn;
            try {
                conn = yield db_1.default.getConnection();
                const query = `
        UPDATE number_of_visitors 
        SET today_count = today_count + 1, total_count = total_count + 1 
        WHERE visitor_id = 1;`;
                const [row] = yield conn.execute(query);
                return row.affectedRows;
            }
            catch (error) {
                throw new error_1.ServerError('Database Error Occurred');
            }
            finally {
                conn === null || conn === void 0 ? void 0 : conn.release();
            }
        });
    }
    getVisitorTodayDate() {
        return __awaiter(this, void 0, void 0, function* () {
            let conn;
            try {
                conn = yield db_1.default.getConnection();
                const query = 'SELECT today_date AS todayDate FROM number_of_visitors WHERE visitor_id = 1;';
                const [row] = yield conn.execute(query);
                return row[0].todayDate;
            }
            catch (error) {
                throw new error_1.ServerError('Database Error Occurred');
            }
            finally {
                conn === null || conn === void 0 ? void 0 : conn.release();
            }
        });
    }
    updateTodayAndToTalVisitorCnt(todayDate) {
        return __awaiter(this, void 0, void 0, function* () {
            let conn;
            try {
                conn = yield db_1.default.getConnection();
                const query = `
        UPDATE number_of_visitors 
        SET today_count = 1, total_count = total_count + 1, today_date = ?
        WHERE visitor_id = 1;`;
                const [row] = yield conn.execute(query, [todayDate]);
                return row.affectedRows;
            }
            catch (error) {
                throw new error_1.ServerError('Database Error Occurred');
            }
            finally {
                conn === null || conn === void 0 ? void 0 : conn.release();
            }
        });
    }
    createComment({ nickname, password, description, }) {
        return __awaiter(this, void 0, void 0, function* () {
            let conn;
            try {
                conn = yield db_1.default.getConnection();
                const query = `
        INSERT INTO visitor_comments (nickname, password, description) 
        VALUES (?, ?, ?);`;
                const [row] = yield conn.execute(query, [
                    nickname,
                    password,
                    description,
                ]);
                return row.insertId;
            }
            catch (error) {
                throw new error_1.ServerError('Database Error Occurred');
            }
            finally {
                conn === null || conn === void 0 ? void 0 : conn.release();
            }
        });
    }
    getVisitorCommentById(visitorCommentId) {
        return __awaiter(this, void 0, void 0, function* () {
            let conn;
            try {
                conn = yield db_1.default.getConnection();
                const query = `SELECT * FROM visitor_comments WHERE visitor_comment_id = ?;`;
                const [row] = yield conn.execute(query, [
                    visitorCommentId,
                ]);
                return row[0];
            }
            catch (error) {
                throw new error_1.ServerError('Database Error Occurred');
            }
        });
    }
    updateVisitorComment(visitorCommentId, description) {
        return __awaiter(this, void 0, void 0, function* () {
            let conn;
            try {
                conn = yield db_1.default.getConnection();
                const query = `UPDATE visitor_comments SET description = ? WHERE visitor_comment_id = ?`;
                const [row] = yield conn.execute(query, [
                    description,
                    visitorCommentId,
                ]);
                return row.affectedRows;
            }
            catch (error) {
                throw new error_1.ServerError('Database Error Occurred');
            }
        });
    }
    getVisitorComments() {
        return __awaiter(this, void 0, void 0, function* () {
            let conn;
            try {
                conn = yield db_1.default.getConnection();
                const query = `
        SELECT visitor_comment_id AS id, nickname, description, DATE_FORMAT(create_date, '%y-%m-%d') AS date 
        FROM visitor_comments;`;
                const [row] = yield conn.execute(query);
                return row;
            }
            catch (error) {
                throw new error_1.ServerError('Database Error Occurred');
            }
        });
    }
    deleteVisitorCommentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let conn;
            try {
                conn = yield db_1.default.getConnection();
                const query = 'DELETE FROM visitor_comments WHERE visitor_comment_id=?;';
                const [row] = yield conn.execute(query, [id]);
                return row.affectedRows;
            }
            catch (error) {
                throw new error_1.ServerError('Database Error Occurred');
            }
        });
    }
}
exports.default = VisitorRepository;
