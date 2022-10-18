import { VisitorCmtDto, VisitorCmtEntity, VisitorDto } from '../apis/visitor/visitor';
import VisitorRepository from '../model/visitorRepository';
import bcrypt from 'bcrypt';
import { NotFoundError, ServerError } from './error';
import moment from 'moment';

interface Response {
  success: boolean;
  msg: string;
}


/**
 * Service class for visitors
 */
class Visitor {
  private readonly visitorRepository: VisitorRepository;
  readonly body;
  constructor(visitorRepository: VisitorRepository, body?: any) {
    this.visitorRepository = visitorRepository;
    this.body = body;
  }

  /**
   * Method for retrieving number of visitors
   * @returns visitorCnt `{ todayCount: number, totalCount: number }`
   */
  async getVisitorCnt() {
    const visitorCnt = await this.visitorRepository.getVisitorCnt();
    return visitorCnt;
  }

  /**
   * Update the number of visitors every time they visit your portfolio web
   * @returns visitorCnt `{ todayCount: number, totalCount: number }`
   */
  async updateAndGetVisitorCnt() {
    const todayDate = await this.visitorRepository.getVisitorTodayDate();
    const formatTodayDate = moment(todayDate, 'YYYY-MM-DD');
    const reqDate = moment().format('YYYY-MM-DD');

    let isUpdate: number;

    if (moment(reqDate).diff(moment(formatTodayDate)) > 0) {
      isUpdate = await this.visitorRepository.updateTodayAndToTalVisitorCnt(
        reqDate
      );
    } else {
      isUpdate = await this.visitorRepository.updateTodayVisitorCnt();
    }

    if (isUpdate) {
      const visitorCnt = await this.getVisitorCnt();

      return visitorCnt;
    }
    throw new ServerError('Interval server error');
  }

  /**
   * Create visitor comment information
   * @returns Promise to return a unique ID for the generated visit comment of the string type
   */
  async createComment(): Promise<number> {
    const { body } = this;
    const encryptedPassword = await this.encryptPassword(body.password);

    const visitorComment: VisitorCmtDto = {
      nickname: body.nickname,
      password: encryptedPassword,
      description: body.description,
    };

    const commentId = await this.visitorRepository.createComment(
      visitorComment
    );

    if (commentId) {
      return commentId;
    }
    throw new ServerError('Interver Server Error');
  }

  /**
   * Method for password encryption
   * @param password String type as value before encryption
   * @returns Encrypt password to return a promise of string type
   */
  private async encryptPassword(password: string): Promise<string> {
    const saltRounds = 10;

    const encryptedPassword = await bcrypt
      .genSalt(saltRounds)
      .then((salt: string) => {
        return bcrypt.hash(password, salt);
      });

    return encryptedPassword;
  }

  /**
   * Visit comment update method
   * @param visitorCommentId Unique ID for modification of number type
   * @returns `{ success: boolean, msg: string }`
   * The password matches to perform the operation and returns a successful result or a failure result.
   * Throw error if no data exists for requested id.
   */
  async updateCommentById(visitorCommentId: number): Promise<Response> {
    const { password, description }: VisitorCmtDto = this.body;

    const visitorComment = await this.visitorRepository.getVisitorCommentById(
      visitorCommentId
    );

    if (!visitorComment) {
      throw new NotFoundError('No data exists');
    }

    const isSamePassword = await this.comparePassword(
      password,
      visitorComment.password
    );

    if (!isSamePassword) {
      return { success: false, msg: 'Passwords do not match' };
    }

    await this.visitorRepository.updateVisitorComment(
      visitorCommentId,
      description
    );

    return { success: true, msg: 'Visitor comment update complete' };
  }

  /**
   * Methods to check for matching encrypted passwords
   * @param password Password Verification Target
   * @param encryptedPassword Valid password for string type
   * @returns Match comparison results to return success or reject due to error
   */
  private async comparePassword(password: string, encryptedPassword: string) {
    return await bcrypt.compare(password, encryptedPassword);
  }

  /** 
   * Methods for querying all visitor comments
   * @returns `{ visitorComments: [{ id: number, nickname: string, description: string, date: string}]}`
   */
  async getVisitorComments(): Promise<{ visitorComments: VisitorCmtEntity[] }> {
    const visitorComments = await this.visitorRepository.getVisitorComments();

    return { visitorComments };
  }

  /**
   * Method to delete visiting comments corresponding to IDs
   * @param visitorCommentId Unique ID for deletion of number type
   * @returns Returns an error because there is no target for deletion or returns true for success
   */
  async deleteVisitorCommentById(visitorCommentId: number): Promise<boolean> {
    const visitorComment = await this.visitorRepository.getVisitorCommentById(
      visitorCommentId
    );

    if (!visitorComment) {
      throw new NotFoundError('No data exists');
    }

    const isDelete = await this.visitorRepository.deleteVisitorCommentById(
      visitorCommentId
    );

    if (isDelete) {
      return true;
    }

    throw new ServerError('Interver Server Error');
  }
}
export default Visitor;
