import { Request, Response } from 'express';
import Visitor from '../../service/visitor';
import VisitorRepository from '../../model/visitorRepository';
import { BadRequestError, ServerError } from '../../service/error';
import errorResposne from '../module/error';
import { VisitorCmtDto, VisitorCmtEntity } from './visitor';

/**
 * @typedef {Object} ResBody
 * @property {number} statusCode
 * @property {number} todayCount
 * @property {number} totalCount
 * @property {string} todayDate
 */

/**
 * api description
 * @url /apis/visitor/count
 * @method patch
 * @prooperty {ResBody} res.body
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
 * @typedef {Object} ResBody
 * @property {number} statusCode
 * @property {number} commentId
 * @property {string} msg
 */

/**
 * api description
 * @url /apis/visitor/comment
 * @method post
 * @property {VisitorCmtDto} req.body
 * @returns {Promise<Response<ResBody>>}
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
 * @typedef {Object} ResBody
 * @property {number} statusCode
 * @property {string} msg
 */

/**
 * api description
 * @url /apis/visitor/comment/{id}
 * @method patch
 * @param {VisitorCmtDto} req.body
 * @returns {Promise<Response<ResBody>>}
 */
const updateVisitCommentById = async (req: Request, res: Response) => {
  const { id: visitorCommentId } = req.params;

  const requestVisitorComment = Object.assign(req.body);

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
 * api description
 * @url /apis/visitor/comments
 * @method get
 * @returns {Promise<Response<VisitorCmtEntity>>}
 */
const getVisitorComments = async (req: Request, res: Response) => {
  try {
    const visitor = new Visitor(new VisitorRepository());

    const response = await visitor.getVisitorComments();

    return res.status(200).json({ statusCode: 200, ...response });
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
 * api description
 * @url /apis/visitor/comment/{id}
 * @method delete
 * @returns {Promise<Response<ResBody>>}
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
