import { JsonController, Get, Param, Body, Post, NotFoundError, BadRequestError } from 'routing-controllers'
import Students from '../students/entity'
import Evaluations from './entity';
// import Batch from '../batches/entity'

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

    @Get('/students/:id/evaluations')
    async getAllEvaluations(
      @Param('id') studentId: number,
    ) {
        
        const student = await Students.findOne(studentId)
        if(!student) throw new BadRequestError(`Student not found`)
  
      return student.evaluations
    }

    // @Authorized()
    @Post('/evaluations')
    async createEvaluation(
      // @Param('id') studentId: number,
      @Body() body: Evaluations
    ) {
        // const student = await Students.findOne(studentId)
        // if(!student) throw new NotFoundError('Student does not exist')
    
        return Evaluations.create(body).save()
    }
}