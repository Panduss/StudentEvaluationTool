import {JsonController, Get, Param, Body, Post, NotFoundError, HttpCode, Delete, Put } from 'routing-controllers'
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

    // @Get('/batches/:batchId/students/:studentId')
    // async isThisWorking(
    //     @Param('batchId') batchId: number,
    //     @Param('studentId') studentId: number
    // ) {
    //     const studentById = await Students.findOne(studentId)
    //     const batch = await Batch.findOne(batchId)
    //     return studentById
    // }

    // @Authorized()
    @Delete('/batches/:batchId/students/:studentId')
    async deleteStudent(
        @Param('batchId') batchId: number,
        @Param('studentId') studentId: number
    ) {
        const batch = await Batch.findOne(batchId)
        const studentById = await Students.findOne(studentId)
        if (!studentById) throw new NotFoundError("Student doesn't exist")
        
        await Students.delete(studentById)

        return `${studentById.firstName} was deleted successfully`
        }


    // // @Authorized()
    @Put('/batches/:batchId/students/:studentId')
    async editStudent(
        @Param('batchId') batchId: number,
        @Param('studentId') studentId: number,
        @Body() update: Partial<Students>
    ) {
        const batch = await Batch.findOne(batchId)
        const student = await Students.findOne(studentId)
        if (!batch) throw new NotFoundError("Batch doesn't exist")
        if (!student) throw new NotFoundError("Batch doesn't exist")

        return Students.merge(student, update).save()
    }


}