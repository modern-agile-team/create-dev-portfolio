"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const visitor_1 = __importDefault(require("../../service/visitor"));
const visitorRepository_1 = __importDefault(require("../../model/visitorRepository"));
const error_1 = require("../../service/error");
const validationCheck_1 = require("./validationCheck");
const class_validator_1 = require("class-validator");
const error_2 = __importDefault(require("./error"));
const updateAndGetVisitor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const visitor = new visitor_1.default(new visitorRepository_1.default(), req.body);
        const response = yield visitor.updateAndGetVisitorCnt();
        if (response)
            return res.status(200).json(Object.assign({ statusCode: 200 }, response));
    }
    catch (err) {
        return (0, error_2.default)(err, res);
    }
});
const createVisitComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { body } = req;
    try {
        const visitorCmt = new validationCheck_1.VisitorCmtDtoValidation();
        visitorCmt.nickname = body.nickname;
        visitorCmt.password = body.password;
        visitorCmt.description = body.description;
        const validationError = yield (0, class_validator_1.validate)(visitorCmt);
        if (validationError.length > 0) {
            console.log(validationError);
            throw new error_1.BadRequestError('The request data is malformed');
        }
        if (((_a = visitorCmt.nickname) === null || _a === void 0 ? void 0 : _a.length) === 0)
            body.nickname = '익명';
        const visitor = new visitor_1.default(new visitorRepository_1.default(), body);
        const response = yield visitor.createComment();
        if (response)
            return res.status(201).json({
                statusCode: 201,
                commentId: response,
                msg: 'Successful visitor comment creation',
            });
    }
    catch (err) {
        return (0, error_2.default)(err, res);
    }
});
const updateVisitCommentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id: visitorCommentId } = req.params;
    try {
        const visitorCmt = new validationCheck_1.UpdateValidation();
        visitorCmt.password = body.password;
        visitorCmt.description = body.description;
        const validationError = yield (0, class_validator_1.validate)(visitorCmt);
        if (validationError.length > 0) {
            console.log(validationError);
            throw new error_1.BadRequestError('The request data is malformed');
        }
        const visitor = new visitor_1.default(new visitorRepository_1.default(), body);
        const response = yield visitor.updateCommentById(Number(visitorCommentId));
        if (!response.success)
            return res.status(401).json({ statusCode: 401, msg: response.msg });
        return res.status(200).json({ statusCode: 200, msg: response.msg });
    }
    catch (err) {
        return (0, error_2.default)(err, res);
    }
});
const getVisitorComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const visitor = new visitor_1.default(new visitorRepository_1.default());
        const response = yield visitor.getVisitorComments();
        return res.status(200).json(Object.assign({ statusCode: 200 }, response));
    }
    catch (err) {
        return (0, error_2.default)(err, res);
    }
});
const deleteVisitorCommentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const visitorCommentId = req.params.id;
        if (!visitorCommentId)
            throw new error_1.BadRequestError('id params is undefined');
        const visitor = new visitor_1.default(new visitorRepository_1.default());
        const response = yield visitor.deleteVisitorCommentById(Number(visitorCommentId));
        if (response)
            return res.status(200).json({
                statusCode: 200,
                msg: 'Successful deletion of visitor comment',
            });
    }
    catch (err) {
        return (0, error_2.default)(err, res);
    }
});
module.exports = {
    updateAndGetVisitor,
    createVisitComment,
    updateVisitCommentById,
    getVisitorComments,
    deleteVisitorCommentById,
};
