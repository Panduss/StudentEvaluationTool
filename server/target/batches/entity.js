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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const entity_1 = require("../students/entity");
const entity_2 = require("../evaluation/entity");
let Batch = class Batch extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Batch.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('text', { nullable: true }),
    __metadata("design:type", Number)
], Batch.prototype, "batchNumber", void 0);
__decorate([
    typeorm_1.Column('text', { nullable: true }),
    __metadata("design:type", String)
], Batch.prototype, "startDate", void 0);
__decorate([
    typeorm_1.Column('text', { nullable: true }),
    __metadata("design:type", String)
], Batch.prototype, "endDate", void 0);
__decorate([
    typeorm_1.OneToMany(_ => entity_1.default, student => student.batch, { eager: true }),
    __metadata("design:type", Array)
], Batch.prototype, "students", void 0);
__decorate([
    typeorm_1.OneToMany(_ => entity_2.default, evaluations => evaluations.batch, { eager: true }),
    __metadata("design:type", Array)
], Batch.prototype, "evaluations", void 0);
Batch = __decorate([
    typeorm_1.Entity()
], Batch);
exports.default = Batch;
//# sourceMappingURL=entity.js.map