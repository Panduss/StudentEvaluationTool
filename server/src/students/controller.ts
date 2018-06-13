import { Authorized, JsonController, Get, Param, Put, Body, Post, Delete, NotFoundError, HttpCode, BadRequestError } from 'routing-controllers'
import Students from './entity'
import Batch from '../batches/entity';

@JsonController()
export default class StudentController {
    
    // @Authorized()
    @Get('/batches/:id/students')
    @HttpCode(200)
    async students(
      @Param('id') batchId: number
    ) {
      const batch = await Batch.findOne(batchId)
      if (!batch) throw new NotFoundError('Batch not found!')
  
      return batch.students

    }
    
    // @Authorized()
    @Get('/batches/:batchId/students/:studentId')
    async studentById(
            @Param('batchId') batchId: number,
            @Param('studentId') studentId: number
          ) {
            const batch = await Batch.findOne(batchId)
            const studentById = await Students.findOne(studentId)
            if (!batch) throw new NotFoundError('Batch not found!')
        
            return {studentById}
      
          }

    // @Authorized()
    @Post('/batches/:batchId/students/')
    async createStudent(            
        @Param('batchId') batchId: number,
        @Body() student: Students,
    ){
        const batch = await Batch.findOne(batchId)
        if(!batch) throw new NotFoundError("Batch doesn't exist")

        return student.save()
    }

    // // @Authorized()
    // @Put('/batches/:id')
    // async editStudent(
    //     @Param('id') id: number,
    //     @Body() update: Partial<Batch>
    // ) {
    //     const batch = await Batch.findOne(id)
    //     if (!batch) throw new NotFoundError('Batch doesn\'t exist')

    //     return Batch.merge(batch, update).save()
    // }

    // // @Authorized()
    // @Delete('/batches/:id')
    // async deleteBatch(
    //     @Param('id') id: number
    // ) {
    //     const batch = await Batch.findOne(id)
    //     if (!batch) throw new NotFoundError('Batch doesn\'t exist')

    //     if (batch) Batch.delete(id)
    //     return 'successfully deleted'
    // }
}