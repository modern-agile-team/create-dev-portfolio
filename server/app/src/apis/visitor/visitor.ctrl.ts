import { Request, Response } from 'express';
import Visitor from '../../service/visitor';
import VisitorRepository from '../../model/visitorRepository';
import { BadRequestError } from '../../service/error';
import errorResposne from '../module/error';

/**
 * @method patch - /apis/visitor/count
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
 * @method post - /apis/visitor/comment
 */
const createVisitComment = async (req: Request, res: Response) => {
  const RequestVisitorComment = Object.assign(req.body);

  try {
    if (RequestVisitorComment.nickname?.length === 0)
      req.body.nickname = '익명';

    const visitor = new Visitor(new VisitorRepository(), RequestVisitorComment);

    const response = await visitor.createComment();

    if (response)
      return res.status(201).json({
        statusCode: 201,
        commentId: response,
        msg: 'Successful visitor comment creation',
      });
  } catch (err) {
    return errorResposne(err, res);
  }
};

/**
 * @method patch - /apis/visitor/comment/{id}
 */
const updateVisitCommentById = async (req: Request, res: Response) => {
  const { id: visitorCommentId } = req.params;

  const requestVisitorComment = Object.assign(req.body);

  try {
    const visitor = new Visitor(new VisitorRepository(), requestVisitorComment);

    const response = await visitor.updateCommentById(Number(visitorCommentId));

    if (!response.success)
      return res.status(401).json({ statusCode: 401, msg: response.msg });
    return res.status(200).json({ statusCode: 200, msg: response.msg });
  } catch (err) {
    return errorResposne(err, res);
  }
};

/**
 * @method get - /apis/visitor/comments
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
 * @method delete - /apis/visitor/comment/{id}
 */
const deleteVisitorCommentById = async (req: Request, res: Response) => {
  try {
    const visitorCommentId = req.params.id;

    if (!visitorCommentId) throw new BadRequestError('id params is undefined');

    const visitor = new Visitor(new VisitorRepository());

    const response = await visitor.deleteVisitorCommentById(
      Number(visitorCommentId)
    );

    if (response)
      return res.status(200).json({
        statusCode: 200,
        msg: 'Successful deletion of visitor comment',
      });
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
