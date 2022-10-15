import { VisitorCmtDto, VisitorCmtEntity, VisitorDto } from '../apis/visitor/visitor';
import VisitorRepository from '../model/visitorRepository';
import bcrypt from 'bcrypt';
import { NotFoundError, ServerError } from './error';
import moment from 'moment';

interface Response {
  success: boolean;
  msg: string;
}


class Visitor {
  /**
   * @param {VisitorRepository} visitorRepository
   * @param {any=} body
   */
  private readonly visitorRepository: VisitorRepository;
  readonly body;
  constructor(visitorRepository: VisitorRepository, body?: any) {
    this.visitorRepository = visitorRepository;
    this.body = body;
  }

  /**
   * @description Method for retrieving number of visitors
   * @returns {VisitorDto} visitorCnt
   */
  async getVisitorCnt() {
    const visitorCnt = await this.visitorRepository.getVisitorCnt();
    return visitorCnt;
  }

  /**
   * @description Update the number of visitors every time they visit your portfolio web
   * @returns {VisitorDto} visitorCnt
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
   * @description Create visitor comment information
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
   * @description Method for password encryption
   * @param {string} password
   * @returns {Promise<string>}
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
   * @param {number} visitorCommentId update target id
   * @returns {Promise<Response>}
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
   * @param {string} password 
   * @param {string} encryptedPassword 
   * @returns {Promise<boolean>} password Verification
   */
  private async comparePassword(password: string, encryptedPassword: string) {
    return await bcrypt.compare(password, encryptedPassword);
  }

  /**
   * @description All visitor comment list retrieval methods
   * @returns {Promise<{ visitorComments: VisitorCmtEntity[] }>}
   */
  async getVisitorComments(): Promise<{ visitorComments: VisitorCmtEntity[] }> {
    const visitorComments = await this.visitorRepository.getVisitorComments();

    return { visitorComments };
  }

  /**
   * @param {number} visitorCommentId visitor comment id you want to delete 
   * @returns {Promise<boolean>}
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
