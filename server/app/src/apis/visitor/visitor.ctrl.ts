import { Request, Response } from 'express';
import Visitor from '../../service/visitor';
import VisitorRepository from '../../model/visitorRepository';
import { BadRequestError } from '../../service/error';
import { VisitorCmtDtoValidation, UpdateValidation } from './validationCheck';
import { validate, ValidationError } from 'class-validator';
import errorResposne from './error';

const updateAndGetVisitor = async (req: Request, res: Response) => {
  try {
    const visitor = new Visitor(new VisitorRepository(), req.body);

    const response = await visitor.updateAndGetVisitorCnt();

    if (response) return res.status(200).json({ statusCode: 200, ...response });
  } catch (err) {
    return errorResposne(err, res);
  }
};

const createVisitComment = async (req: Request, res: Response, next: any) => {
  const { body } = req;

  try {
    const visitorCmt = new VisitorCmtDtoValidation();
    visitorCmt.nickname = body.nickname;
    visitorCmt.password = body.password;
    visitorCmt.description = body.description;

    const validationError: ValidationError[] = await validate(visitorCmt);

    if (validationError.length > 0) {
      console.log(validationError);
      throw new BadRequestError('The request data is malformed');
    }

    if (visitorCmt.nickname?.length === 0) body.nickname = '익명';

    const visitor = new Visitor(new VisitorRepository(), body);

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

const updateVisitCommentById = async (req: Request, res: Response) => {
  const { body } = req;
  const { id: visitorCommentId } = req.params;

  try {
    const visitorCmt = new UpdateValidation();
    visitorCmt.password = body.password;
    visitorCmt.description = body.description;

    const validationError: ValidationError[] = await validate(visitorCmt);

    if (validationError.length > 0) {
      console.log(validationError);
      throw new BadRequestError('The request data is malformed');
    }

    const visitor = new Visitor(new VisitorRepository(), body);

    const response = await visitor.updateCommentById(Number(visitorCommentId));

    if (!response.success)
      return res.status(401).json({ statusCode: 401, msg: response.msg });
    return res.status(200).json({ statusCode: 200, msg: response.msg });
  } catch (err) {
    return errorResposne(err, res);
  }
};

const getVisitorComments = async (req: Request, res: Response) => {
  try {
    const visitor = new Visitor(new VisitorRepository());

    const response = await visitor.getVisitorComments();

    return res.status(200).json({ statusCode: 200, ...response });
  } catch (err) {
    return errorResposne(err, res);
  }
};

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
