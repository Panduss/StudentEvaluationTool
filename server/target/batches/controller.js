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
let BatchController = class BatchController {
    allBatches() {
        return entity_1.default.find();
    }
    async getBatchById(id) {
        const batchById = await entity_1.default.findOne(id);
        return batchById;
    }
    async createBatch(body) {
        return entity_1.default.create(body).save();
    }
    async editBatch(id, update) {
        const batch = await entity_1.default.findOne(id);
        if (!batch)
            throw new routing_controllers_1.NotFoundError("Batch doesn't exist");
        return entity_1.default.merge(batch, update).save();
    }
    async deleteBatch(id) {
        const batch = await entity_1.default.findOne(id);
        if (!batch)
            throw new routing_controllers_1.NotFoundError("Batch doesn't exist");
        await entity_1.default.delete(id);
        return 'Batch deleted';
    }
};
__decorate([
    routing_controllers_1.Get('/batches'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BatchController.prototype, "allBatches", null);
__decorate([
    routing_controllers_1.Get('/batches/:id'),
    __param(0, routing_controllers_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BatchController.prototype, "getBatchById", null);
__decorate([
    routing_controllers_1.Post('/batches'),
    routing_controllers_1.HttpCode(201),
    __param(0, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entity_1.default]),
    __metadata("design:returntype", Promise)
], BatchController.prototype, "createBatch", null);
__decorate([
    routing_controllers_1.Put('/batches/:id'),
    __param(0, routing_controllers_1.Param('id')),
    __param(1, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], BatchController.prototype, "editBatch", null);
__decorate([
    routing_controllers_1.Delete('/batches/:id'),
    __param(0, routing_controllers_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BatchController.prototype, "deleteBatch", null);
BatchController = __decorate([
    routing_controllers_1.JsonController()
], BatchController);
exports.default = BatchController;
//# sourceMappingURL=controller.js.map