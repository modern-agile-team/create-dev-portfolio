export class ServerError extends Error {
  code: number;
  constructor(message: string) {
    super(message);
    this.name = 'ServerError';
    this.code = 500;
  }
}

export class BadRequestError extends Error {
  code: number;
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
    this.code = 404;
  }
}
