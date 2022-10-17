import { OkPacket, ResultSetHeader, RowDataPacket } from 'mysql2';
import {
  VisitorCmtDto,
  VisitorCmtEntity,
  VisitorDto,
} from '../apis/visitor/visitor';
import db from '../config/db';
import { ServerError } from '../service/error';

/**
 * Visitor-related data processing class
 */
class VisitorRepository {
  /**
   * Today number of visitors and total number of visitors inquiry method
   * @returns `{ todayCount: number, totalCount: number }`
   */
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

  /**
   * Today's visits and total visits increase method
   * @returns `boolean` Whether to update
   */
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

  /**
   * Inquery today's date for visitor count table
   * @returns `string` today's date
   * @example 2022-09-12 00:00:00
   */
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

  /**
   * Request date and number of visitors today, total number of visitors update method
   * @params 
   * @todayDate `string` today date
   * @returns `boolean` Whether to update
   */
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

  /**
   * Visit comment generation method
   * @params `{ nickname: string, password: string, description: string }`
   * @returns `number` Unique ID of the updated visit comment
   */
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

  /**
   * Visit comment inquery method for ID
   * @params `number` Unique ID of the inquery target
   * @returns `{ id: number, nickname: string, description: string, date: string }`
   */
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

  /**
   * Save visit comment modification method
   * @params 
   * @visitorCommentId `number` Unique ID to be modified
   * @description `string` Modified comments
   * @returns `boolean` Whether to update
   */
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

  /**
   * All visit comment inquery method
   * @returns `[{ id: number, nickname: string, description: string, date: string }]`
   */
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

  /**
   * Delete visiting comments with unique ID method
   * @params
   * @id `number` Unique ID for deletion
   * @returns `boolean` Whether to update
   */
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
