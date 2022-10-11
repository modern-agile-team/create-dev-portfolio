import { OkPacket, ResultSetHeader, RowDataPacket } from 'mysql2';
import {
  VisitorCmtDto,
  VisitorCmtEntity,
  VisitorDto,
} from '../apis/visitor/visitor';
import db from '../config/db';
import { ServerError } from '../service/error';

class VisitorRepository {
  async getVisitorCnt(): Promise<VisitorDto> {
    let conn;
    try {
      conn = await db.getConnection();

      const query = `
        SELECT today_count AS todayCount, total_count AS totalCount 
        FROM number_of_visitors 
        WHERE visitor_id = 1`;

      const [rows] = await conn.execute<VisitorDto[]>(query);

      return rows[0];
    } catch (error) {
      throw new ServerError('Database Error Occurred');
    } finally {
      conn?.release();
    }
  }

  async updateTodayVisitorCnt(): Promise<number> {
    let conn;
    try {
      conn = await db.getConnection();

      const query = `
        UPDATE number_of_visitors 
        SET today_count = today_count + 1, total_count = total_count + 1 
        WHERE visitor_id = 1;`;

      const [row] = await conn.execute<OkPacket>(query);

      return row.affectedRows;
    } catch (error) {
      throw new ServerError('Database Error Occurred');
    } finally {
      conn?.release();
    }
  }

  async getVisitorTodayDate() {
    let conn;
    try {
      conn = await db.getConnection();

      const query =
        'SELECT today_date AS todayDate FROM number_of_visitors WHERE visitor_id = 1;';

      const [row] = await conn.execute<RowDataPacket[]>(query);

      return row[0].todayDate;
    } catch (error) {
      throw new ServerError('Database Error Occurred');
    } finally {
      conn?.release();
    }
  }

  async updateTodayAndToTalVisitorCnt(todayDate: string) {
    let conn;
    try {
      conn = await db.getConnection();

      const query = `
        UPDATE number_of_visitors 
        SET today_count = 1, total_count = total_count + 1, today_date = ?
        WHERE visitor_id = 1;`;

      const [row] = await conn.execute<OkPacket>(query, [todayDate]);

      return row.affectedRows;
    } catch (error) {
      throw new ServerError('Database Error Occurred');
    } finally {
      conn?.release();
    }
  }

  async createComment({
    nickname,
    password,
    description,
  }: VisitorCmtDto): Promise<number> {
    let conn;
    try {
      conn = await db.getConnection();

      const query = `
        INSERT INTO visitor_comments (nickname, password, description) 
        VALUES (?, ?, ?);`;

      const [row] = await conn.execute<ResultSetHeader>(query, [
        nickname,
        password,
        description,
      ]);

      return row.insertId;
    } catch (error) {
      throw new ServerError('Database Error Occurred');
    } finally {
      conn?.release();
    }
  }

  async getVisitorCommentById(
    visitorCommentId: number
  ): Promise<VisitorCmtEntity> {
    let conn;
    try {
      conn = await db.getConnection();

      const query = `SELECT * FROM visitor_comments WHERE visitor_comment_id = ?;`;

      const [row] = await conn.execute<VisitorCmtEntity[]>(query, [
        visitorCommentId,
      ]);

      return row[0];
    } catch (error) {
      throw new ServerError('Database Error Occurred');
    }
  }

  async updateVisitorComment(
    visitorCommentId: number,
    description: string
  ): Promise<number> {
    let conn;
    try {
      conn = await db.getConnection();

      const query = `UPDATE visitor_comments SET description = ? WHERE visitor_comment_id = ?`;

      const [row] = await conn.execute<OkPacket>(query, [
        description,
        visitorCommentId,
      ]);

      return row.affectedRows;
    } catch (error) {
      throw new ServerError('Database Error Occurred');
    }
  }

  async getVisitorComments(): Promise<VisitorCmtEntity[]> {
    let conn;
    try {
      conn = await db.getConnection();

      const query = `
        SELECT visitor_comment_id AS id, nickname, description, DATE_FORMAT(create_date, '%y-%m-%d') AS date 
        FROM visitor_comments;`;

      const [row] = await conn.execute<VisitorCmtEntity[]>(query);

      return row;
    } catch (error) {
      throw new ServerError('Database Error Occurred');
    }
  }

  async deleteVisitorCommentById(id: number): Promise<number> {
    let conn;
    try {
      conn = await db.getConnection();

      const query = 'DELETE FROM visitor_comments WHERE visitor_comment_id=?;';

      const [row] = await conn.execute<OkPacket>(query, [id]);

      return row.affectedRows;
    } catch (error) {
      throw new ServerError('Database Error Occurred');
    }
  }
}

export default VisitorRepository;
