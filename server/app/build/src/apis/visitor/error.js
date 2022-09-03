"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("../../service/error");
function errorResposne(err, res) {
    if (err instanceof error_1.ServerError) {
        console.error(err);
        return res.status(500).json({ statusCode: err.code, msg: err.message });
    }
    else if (err instanceof error_1.BadRequestError) {
        console.error(err);
        return res.status(404).json({ statusCode: err.code, msg: err.message });
    }
    else {
        console.error(err);
        return res.status(500).json({ statusCode: 500, msg: 'Unknown error' });
    }
}
exports.default = errorResposne;
