import { Request, Response } from 'express';
import Visitor from '../../service/visitor';
import VisitorRepository from '../../model/visitorRepository';
import { BadRequestError, ServerError } from '../../service/error';
import errorResposne from '../module/error';
import { VisitorCmtDto } from './visitor';

/**
 * Visitor increase and lookup API
 * @url /apis/visitor/count
 * @method patch
 * @resBody `{ statusCode: number, todayCount: number, totalCount: number }` 
 * success response body
 * @resBody `{ statusCode: number, msg: string }` fail response body
 */
const updateAndGetVisitor = async (req: Request, res: Response) => {
  try {
    const visitor = new Visitor(new VisitorRepository());

    const response = await visitor.updateAndGetVisitorCnt();

    return res.status(200).json({ statusCode: 200, ...response });
  } catch (err) {
    return errorResposne(err, res);
  }
};

/**
 * Visit comment generation API
 * @url /apis/visitor/comment
 * @method post
 * @reqBody `{ nickname: string, password: string, description: string }`
 * @resBody `{ statusCode: number, commendId: number, msg: string }` success response body
 * @resBody `{ statusCode: number, msg: string }` fail response body
 */
const createVisitComment = async (req: Request, res: Response) => {
  const RequestVisitorComment: VisitorCmtDto = Object.assign(req.body);

  try {
    if (RequestVisitorComment.nickname?.length === 0) {
      req.body.nickname = '익명';
    }

    const visitor = new Visitor(new VisitorRepository(), RequestVisitorComment);

    const response = await visitor.createComment();

    if (response) {
      return res.status(201).json({
        statusCode: 201,
        commentId: response,
        msg: 'Successful visitor comment creation',
      });
    }
    throw new ServerError('Interver Server Error')
  } catch (err) {
    return errorResposne(err, res);
  }
};

/**
 * API for editing visited comments
 * @url /apis/visitor/comment/:id
 * @method patch
 * @reqParams `{ id: number }` Unique number of edit comment
 * @reqBody `{ password: string, description: string }`
 * @resBody `{ statusCode: number, msg: string }` success or fail response body
 */
const updateVisitCommentById = async (req: Request, res: Response) => {
  const { id: visitorCommentId } = req.params;

  const requestVisitorComment: VisitorCmtDto = Object.assign(req.body);

  try {
    const visitor = new Visitor(new VisitorRepository(), requestVisitorComment);

    const response = await visitor.updateCommentById(Number(visitorCommentId));

    if (!response.success) {
      return res.status(401).json({ statusCode: 401, msg: response.msg });
    }
    return res.status(200).json({ statusCode: 200, msg: response.msg });
  } catch (err) {
    return errorResposne(err, res);
  }
};

/**
 * All visit comment lookup APIs
 * @url /apis/visitor/comments
 * @method get
 * @resBody `{ statusCode: number, visitorComments: [{id: number, nickname: string,
  description: string, date: string }] }` success response body
 * @resBody `{ statusCode: number, mesg: string }` fail response body
 */
const getVisitorComments = async (req: Request, res: Response) => {
  try {
    const visitor = new Visitor(new VisitorRepository());

    const { visitorComments } = await visitor.getVisitorComments();

    return res.status(200).json({ statusCode: 200, visitorComments });
  } catch (err) {
    return errorResposne(err, res);
  }
};

/**
 * @typedef {Object} ResBody
 * @property {number} statusCode
 * @property {string} msg
 */

/**
 * Visit comment delete API
 * @url /apis/visitor/comment/:id
 * @method delete
 * @reqParams `{ id: number }` Unique ID of the target to be deleted 
 * @resBody `{ statusCode: number, msg: string }` success response body
 * @resBody `{ statusCode: number, msg: string }` fail response body
 */
const deleteVisitorCommentById = async (req: Request, res: Response) => {
  try {
    const visitorCommentId = req.params.id;

    if (!visitorCommentId) {
      throw new BadRequestError('id params is undefined');
    }
    const visitor = new Visitor(new VisitorRepository());

    const response = await visitor.deleteVisitorCommentById(
      Number(visitorCommentId)
    );

    if (response) {
      return res.status(200).json({
        statusCode: 200,
        msg: 'Successful deletion of visitor comment',
      });
    }
  } catch (err) {
    return errorResposne(err, res);
  }
};

export = {
  updateAndGetVisitor,
  createVisitComment,
  updateVisitCommentById,
  getVisitorComments,
  deleteVisitorCommentById,
};
