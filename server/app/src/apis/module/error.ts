import {
  BadRequestError,
  NotFoundError,
  ServerError,
} from '../../service/error';
import { Response } from 'express';

/**
 * Branch handling of error code capabilities for error codes
 * @param err `{ unknown | ServerError | BadRequestError | NotFoundError }`
 * @param res
 * @returns {Response<ErrorResponse>} res
 */
function errorResposne(
  err: unknown | ServerError | BadRequestError | NotFoundError,
  res: Response
) {
  if (err instanceof ServerError) {
    return res.status(500).json({ statusCode: err.code, msg: err.message });
  }
  if (err instanceof BadRequestError) {
    return res.status(400).json({ statusCode: err.code, msg: err.message });
  }
  if (err instanceof NotFoundError) {
    return res.status(404).json({ statusCode: err.code, msg: err.message });
  }
  return res.status(500).json({ statusCode: 500, msg: 'Unknown error' });
}

export default errorResposne;
