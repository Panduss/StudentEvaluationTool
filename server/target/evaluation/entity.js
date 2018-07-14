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
const entity_2 = require("../batches/entity");
let today = new Date().toLocaleDateString("en-US");
let Evaluations = class Evaluations extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Evaluations.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('text', { nullable: true }),
    __metadata("design:type", String)
], Evaluations.prototype, "remarks", void 0);
__decorate([
    typeorm_1.Column('text', { nullable: false }),
    __metadata("design:type", String)
], Evaluations.prototype, "colour", void 0);
__decorate([
    typeorm_1.Column('text', { default: today, nullable: false }),
    __metadata("design:type", String)
], Evaluations.prototype, "date", void 0);
__decorate([
    typeorm_1.ManyToOne(_ => entity_1.default, student => student.evaluations, { onDelete: 'CASCADE', nullable: false }),
    __metadata("design:type", entity_1.default)
], Evaluations.prototype, "student", void 0);
__decorate([
    typeorm_1.ManyToOne(_ => entity_2.default, batch => batch.evaluations, { onDelete: 'CASCADE', nullable: false }),
    __metadata("design:type", entity_2.default)
], Evaluations.prototype, "batch", void 0);
Evaluations = __decorate([
    typeorm_1.Entity()
], Evaluations);
exports.default = Evaluations;
//# sourceMappingURL=entity.js.map