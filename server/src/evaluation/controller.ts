import { Authorized, JsonController, Get, Param, Put, Body, Post, Delete, NotFoundError, HttpCode, BadRequestError } from 'routing-controllers'
import Students from '../students/entity'
import Evalu from './entity';

@JsonController()
export default class EvaluController {

    // @Authorized()
    @Get('/students/:id/evaluations')
    @HttpCode(200)
    async getEvaluations(
      @Param('id') studentId: number
    ) {
      const student = await Students.findOne(studentId)
      if(!student) throw new BadRequestError(`Student not found`)
  
      return student.evalu
    }


    // @Authorized()
    @Post('/students/:id/evaluations')
    @HttpCode(201)
    async createEvaluation(
      @Body() evaluation: Evalu,
      @Param('id') studentId: number
    ) {
      const student = await Students.findOne(studentId)
      if(!student) throw new NotFoundError('Student does not exist')
  
      const createdEvaluation = await Evalu.create({...evaluation, student}).save()
  
      return createdEvaluation
    }
}