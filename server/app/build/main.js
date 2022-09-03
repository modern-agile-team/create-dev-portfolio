"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yamljs_1 = __importDefault(require("yamljs"));
const path_1 = __importDefault(require("path"));
require("dotenv/config");
const swaggerSpec = yamljs_1.default.load(path_1.default.join(__dirname, './swagger.yaml'));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
const visitor_1 = __importDefault(require("./src/apis/visitor"));
app.listen(PORT, () => {
    console.log(`server start at ${PORT}`);
});
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/swagger', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
app.use('/apis/visitor', visitor_1.default);
module.exports = app;
