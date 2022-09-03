"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestError = exports.ServerError = void 0;
class ServerError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ServerError';
        this.code = 500;
    }
}
exports.ServerError = ServerError;
class BadRequestError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
        this.code = 404;
    }
}
exports.BadRequestError = BadRequestError;
