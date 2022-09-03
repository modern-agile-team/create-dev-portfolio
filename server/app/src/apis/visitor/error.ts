import { BadRequestError, ServerError } from '../../service/error';
import { Response } from 'express';

function errorResposne(
  err: unknown | ServerError | BadRequestError,
  res: Response
) {
  if (err instanceof ServerError) {
    console.error(err);
    return res.status(500).json({ statusCode: err.code, msg: err.message });
  } else if (err instanceof BadRequestError) {
    console.error(err);
    return res.status(404).json({ statusCode: err.code, msg: err.message });
  } else {
    console.error(err);
    return res.status(500).json({ statusCode: 500, msg: 'Unknown error' });
  }
}

export default errorResposne;
