"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisitorCmtDtoValidation = exports.UpdateValidation = void 0;
const class_validator_1 = require("class-validator");
class VisitorCmtDtoValidation {
}
__decorate([
    (0, class_validator_1.Length)(0, 20)
], VisitorCmtDtoValidation.prototype, "nickname", void 0);
__decorate([
    (0, class_validator_1.Length)(4, 20)
], VisitorCmtDtoValidation.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.Length)(1, 250)
], VisitorCmtDtoValidation.prototype, "description", void 0);
exports.VisitorCmtDtoValidation = VisitorCmtDtoValidation;
class UpdateValidation {
}
__decorate([
    (0, class_validator_1.Length)(4, 20)
], UpdateValidation.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.Length)(1, 250)
], UpdateValidation.prototype, "description", void 0);
exports.UpdateValidation = UpdateValidation;
