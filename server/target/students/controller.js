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
const entity_1 = require("./entity");
const entity_2 = require("../batches/entity");
let StudentController = class StudentController {
    async studentsByBatch(batchId) {
        const batch = await entity_2.default.findOne(batchId);
        if (!batch)
            throw new routing_controllers_1.NotFoundError('Batch not found!');
        return batch.students;
    }
    allStudents() {
        return entity_1.default.find();
    }
    async studentById(batchId, studentId) {
        const batch = await entity_2.default.findOne(batchId);
        const student = await entity_1.default.findOne(studentId);
        if (!batch)
            throw new routing_controllers_1.NotFoundError('Batch not found!');
        return student;
    }
    async createStudent(batchId, body) {
        const batch = await entity_2.default.findOne(batchId);
        if (!batch)
            throw new routing_controllers_1.NotFoundError("Batch doesn't exist");
        return entity_1.default.create(body).save();
    }
    async removeStudent(id) {
        const student = await entity_1.default.findOne(id);
        if (!student)
            throw new routing_controllers_1.NotFoundError("Student doesn't exist");
        await entity_1.default.remove(student);
        return "removed!";
    }
    async editStudent(batchId, studentId, update) {
        console.log(batchId, studentId, "studentController");
        const batch = await entity_2.default.findOne(batchId);
        const student = await entity_1.default.findOne(studentId);
        if (!batch)
            throw new routing_controllers_1.NotFoundError("Batch doesn't exist");
        if (!student)
            throw new routing_controllers_1.NotFoundError("Student doesn't exist");
        return entity_1.default.merge(student, update).save();
    }
};
__decorate([
    routing_controllers_1.Get('/batches/:id/students'),
    routing_controllers_1.HttpCode(200),
    __param(0, routing_controllers_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "studentsByBatch", null);
__decorate([
    routing_controllers_1.Get('/students'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StudentController.prototype, "allStudents", null);
__decorate([
    routing_controllers_1.Get('/batches/:batchId/students/:studentId'),
    __param(0, routing_controllers_1.Param('batchId')),
    __param(1, routing_controllers_1.Param('studentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "studentById", null);
__decorate([
    routing_controllers_1.Post('/batches/:id/students'),
    __param(0, routing_controllers_1.Param('id')),
    __param(1, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, entity_1.default]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "createStudent", null);
__decorate([
    routing_controllers_1.Delete('/students/:id'),
    __param(0, routing_controllers_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "removeStudent", null);
__decorate([
    routing_controllers_1.Put('/batches/:batchId/students/:studentId'),
    __param(0, routing_controllers_1.Param('batchId')),
    __param(1, routing_controllers_1.Param('studentId')),
    __param(2, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "editStudent", null);
StudentController = __decorate([
    routing_controllers_1.JsonController()
], StudentController);
exports.default = StudentController;
//# sourceMappingURL=controller.js.map