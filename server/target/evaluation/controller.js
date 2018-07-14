"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
const entity_1 = require("../students/entity");
const entity_2 = require("./entity");
const entity_3 = require("../batches/entity");
let EvaluController = class EvaluController {
    async getAllEvaluations(studentId, batchId) {
        const batch = await entity_3.default.findOne(batchId);
        const student = await entity_1.default.findOne(studentId);
        if (!student)
            throw new routing_controllers_1.BadRequestError(`Student not found`);
        if (!batch)
            throw new routing_controllers_1.NotFoundError('Batch does not exist');
        return student.evaluations;
    }
    async createEvaluation(studentId, batchId, evaluation) {
        const batch = await entity_3.default.findOne(batchId);
        const student = await entity_1.default.findOne(studentId);
        console.log(batchId, studentId, "batchandstudentfrom thebackend");
        if (!student)
            throw new routing_controllers_1.NotFoundError('Student does not exist');
        if (!batch)
            throw new routing_controllers_1.NotFoundError('Batch does not exist');
        return entity_2.default.create(evaluation).save();
    }
};
__decorate([
    routing_controllers_1.Get('/batches/:batchId/students/:studentId/evaluations'),
    __param(0, routing_controllers_1.Param('studentId')),
    __param(1, routing_controllers_1.Param('batchId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], EvaluController.prototype, "getAllEvaluations", null);
__decorate([
    routing_controllers_1.Post('/batches/:batchId/students/:studentId/evaluations'),
    __param(0, routing_controllers_1.Param('studentId')),
    __param(1, routing_controllers_1.Param('batchId')),
    __param(2, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, entity_2.default]),
    __metadata("design:returntype", Promise)
], EvaluController.prototype, "createEvaluation", null);
EvaluController = __decorate([
    routing_controllers_1.JsonController()
], EvaluController);
exports.default = EvaluController;
//# sourceMappingURL=controller.js.map