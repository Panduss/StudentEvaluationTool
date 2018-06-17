import { JsonController, Get, Param, Body, Post, NotFoundError, BadRequestError } from 'routing-controllers'
import Students from '../students/entity'
import Evaluations from './entity';
import Batch from '../batches/entity'

@JsonController()
export default class EvaluController {

    // @Authorized()
    // @Get('/students/:studentId/evaluations')
    // async getEvaluations(
    //   @Param('studentId') studentId: number
    // ) {
    //   const student = await Students.findOne(studentId)
    //   if(!student) throw new BadRequestError(`Student not found`)
  
    //   return student.evaluations
    // }

    @Get('/batches/:batchId/students/:studentId/evaluations')
    async getAllEvaluations(
      @Param('studentId') studentId: number,
      @Param('batchId') batchId: number
    ) {
        
        const batch = await Batch.findOne(batchId)
        const student = await Students.findOne(studentId)
        if(!student) throw new BadRequestError(`Student not found`)
        if(!batch) throw new NotFoundError('Batch does not exist')
  
      return student.evaluations
    }

    // @Authorized()
    @Post('/batches/:batchId/students/:studentId/evaluations')
    async createEvaluation(
      @Param('studentId') studentId: number,
      @Param('batchId') batchId: number,
      @Body() evaluation: Evaluations
    ) {
        const batch = await Batch.findOne(batchId)
        const student = await Students.findOne(studentId)
        console.log(batchId, studentId, "batchandstudentfrom thebackend")
        if(!student) throw new NotFoundError('Student does not exist')
        if(!batch) throw new NotFoundError('Batch does not exist')
    
        return Evaluations.create(evaluation).save()
    }

    // @Post('/batches/:batchId/students/:studentId/evaluations')
    // async createEvaluation(
    //   @Param('studentId') studentId: number,
    //   @Param('batchId') batchId: number,
    //   @Body() evaluation: Evaluations
    // ) {
    //     const batch = await Batch.findOne(batchId)
    //     const student = await Students.findOne(studentId)
    //     console.log(batch, student, "batchandstudentfrom thebackend")
    //     if(!student) throw new NotFoundError('Student does not exist')
    //     if(!batch) throw new NotFoundError('Batch does not exist')
    
    //     return Evaluations.create(evaluation).save()
    // }
}