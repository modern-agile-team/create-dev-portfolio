import { validate, ValidationError } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import VisitorCommentValidator from '../module/validator';

interface ValidationErrorItem {
  property?: string;
  constraints?: object;
}

/**
 * @description Validation logic for request
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 * @returns
 */
async function validationCheck(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const RequestVisitorComment = Object.assign(req.body);

  const visitorComment = new VisitorCommentValidator();

  Object.assign(visitorComment, RequestVisitorComment);

  const validationError: ValidationError[] = await validate(visitorComment);

  if (validationError.length > 0) {
    const errorList = validationError.map((error) => {
      const errorObj: ValidationErrorItem = {};

      errorObj.property = error.property;
      errorObj.constraints = error.constraints;

      return errorObj;
    });

    return res.status(400).json({
      statusCode: 400,
      message: 'The request data is malformed',
      detail: errorList,
    });
  }

  next();
}

export default validationCheck;
