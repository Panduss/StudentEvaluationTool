import { JsonController, Get, Param, Body, Post, NotFoundError, BadRequestError } from 'routing-controllers'
import Students from '../students/entity'
import Evaluations from './entity';
import Batch from '../batches/entity'

@JsonController()
export default class EvaluController {

    // @Authorized()
    @Get('/students/:id/evaluations')
    async getEvaluations(
      @Param('id') studentId: number
    ) {
      const student = await Students.findOne(studentId)
      if(!student) throw new BadRequestError(`Student not found`)
  
      return student.evaluations
    }

    @Get('/batches/:batchId/students/:studentId/evaluations')
    async getAllEvaluations(
      @Param('studentId') studentId: number,
      @Param('batchId') batchId: number
    ) {
        
        const batch = await Batch.findOne(batchId)
        const student = await Students.findOne(studentId)
        if(!student) throw new BadRequestError(`Student not found`)
        if(!batch) throw new NotFoundError('Student does not exist')
  
      return student.evaluations
    }

    // @Authorized()
    @Post('/batches/:batchId/students/:studentId/evaluations')
    async createEvaluation(
      @Param('studentId') studentId: number,
      @Param('batchId') batchId: number,
      @Body() body: Evaluations
    ) {
        const batch = await Batch.findOne(batchId)
        const student = await Students.findOne(studentId)
        if(!student) throw new NotFoundError('Student does not exist')
        if(!batch) throw new NotFoundError('Batch does not exist')
    
        return Evaluations.create(body).save()
    }
}