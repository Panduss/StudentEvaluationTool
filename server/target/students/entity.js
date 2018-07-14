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
const entity_1 = require("../batches/entity");
const entity_2 = require("../evaluation/entity");
const class_validator_1 = require("class-validator");
let Students = class Students extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Students.prototype, "id", void 0);
__decorate([
    class_validator_1.IsString(),
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], Students.prototype, "firstName", void 0);
__decorate([
    class_validator_1.IsString(),
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], Students.prototype, "lastName", void 0);
__decorate([
    class_validator_1.IsString(),
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], Students.prototype, "profilePic", void 0);
__decorate([
    class_validator_1.IsString(),
    typeorm_1.Column('text', { default: 'white' }),
    __metadata("design:type", String)
], Students.prototype, "lastEvaluation", void 0);
__decorate([
    typeorm_1.ManyToOne(_ => entity_1.default, batch => batch.students, { onDelete: 'CASCADE' }),
    __metadata("design:type", entity_1.default)
], Students.prototype, "batch", void 0);
__decorate([
    typeorm_1.OneToMany(_ => entity_2.default, evaluations => evaluations.student, { eager: true }),
    __metadata("design:type", Array)
], Students.prototype, "evaluations", void 0);
Students = __decorate([
    typeorm_1.Entity()
], Students);
exports.default = Students;
//# sourceMappingURL=entity.js.map