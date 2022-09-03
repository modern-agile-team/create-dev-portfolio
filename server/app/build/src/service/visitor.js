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
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const error_1 = require("./error");
const moment_1 = __importDefault(require("moment"));
class Visitor {
    constructor(visitorRepository, body) {
        this.visitorRepository = visitorRepository;
        this.body = body;
    }
    getVisitorCnt() {
        return __awaiter(this, void 0, void 0, function* () {
            const visitorCnt = yield this.visitorRepository.getVisitorCnt();
            return visitorCnt;
        });
    }
    updateAndGetVisitorCnt() {
        return __awaiter(this, void 0, void 0, function* () {
            const todayDate = yield this.visitorRepository.getVisitorTodayDate();
            const formatTodayDate = (0, moment_1.default)(todayDate, 'YYYY-MM-DD');
            const reqDate = (0, moment_1.default)().format('YYYY-MM-DD');
            let isUpdate;
            if ((0, moment_1.default)(reqDate).diff((0, moment_1.default)(formatTodayDate)) > 0) {
                isUpdate = yield this.visitorRepository.updateTodayAndToTalVisitorCnt(reqDate);
            }
            else {
                isUpdate = yield this.visitorRepository.updateTodayVisitorCnt();
            }
            if (isUpdate) {
                const visitorCnt = yield this.getVisitorCnt();
                return visitorCnt;
            }
            throw new error_1.ServerError('interval server error');
        });
    }
    createComment() {
        return __awaiter(this, void 0, void 0, function* () {
            const { body } = this;
            const encryptedPassword = yield this.encryptPassword(body.password);
            const visitorComment = {
                nickname: body.nickname,
                password: encryptedPassword,
                description: body.description,
            };
            const commentId = yield this.visitorRepository.createComment(visitorComment);
            if (commentId)
                return commentId;
            throw new error_1.ServerError('Interver Server Error');
        });
    }
    encryptPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const saltRounds = 10;
                const encryptedPassword = yield bcrypt_1.default
                    .genSalt(saltRounds)
                    .then((salt) => {
                    return bcrypt_1.default.hash(password, salt);
                });
                return encryptedPassword;
            }
            catch (error) {
                throw new error_1.ServerError('Password encryption failed');
            }
        });
    }
    updateCommentById(visitorCommentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { password, description } = this.body;
            const visitorComment = yield this.visitorRepository.getVisitorCommentById(visitorCommentId);
            if (!visitorComment)
                throw new error_1.BadRequestError('No data exists');
            const isSamePassword = yield this.comparePassword(password, visitorComment.password);
            if (!isSamePassword)
                return { success: false, msg: 'Passwords do not match' };
            yield this.visitorRepository.updateVisitorComment(visitorCommentId, description);
            return { success: true, msg: 'Visitor comment update complete' };
        });
    }
    comparePassword(password, encryptedPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcrypt_1.default.compare(password, encryptedPassword);
        });
    }
    getVisitorComments() {
        return __awaiter(this, void 0, void 0, function* () {
            const visitorComments = yield this.visitorRepository.getVisitorComments();
            return { visitorComments };
        });
    }
    deleteVisitorCommentById(visitorCommentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const visitorComment = yield this.visitorRepository.getVisitorCommentById(visitorCommentId);
            if (!visitorComment)
                throw new error_1.BadRequestError('No data exists');
            const isDelete = yield this.visitorRepository.deleteVisitorCommentById(visitorCommentId);
            if (isDelete)
                return true;
            throw new error_1.ServerError('Interver Server Error');
        });
    }
}
exports.default = Visitor;
