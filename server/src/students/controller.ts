import {JsonController, Get, Param, Body, Post, NotFoundError, HttpCode, Delete, Put } from 'routing-controllers'
import Students from './entity'
import Batch from '../batches/entity';

@JsonController()
export default class StudentController {
    
    // @Authorized()
    @Get('/batches/:id/students')
    @HttpCode(200)
    async studentsByBatch(
      @Param('id') batchId: number
    ) {
      const batch = await Batch.findOne(batchId)
      if (!batch) throw new NotFoundError('Batch not found!')
  
      return batch.students

    }

    // @Authorized()
    @Get('/students')
    allStudents() {
        return Students.find()
    
    }
    
    // @Authorized()
    @Get('/batches/:batchId/students/:studentId')
    async studentById(
            @Param('batchId') batchId: number,
            @Param('studentId') studentId: number
          ) {
            const batch = await Batch.findOne(batchId)
            const student = await Students.findOne(studentId)
            if (!batch) throw new NotFoundError('Batch not found!')
        
            return student
      
          }

    // @Authorized()
    @Post('/batches/:id/students')
    async createStudent(            
        @Param('id') batchId: number,
        @Body() body: Students,
    ){
        const batch = await Batch.findOne(batchId)
        if(!batch) throw new NotFoundError("Batch doesn't exist")

        return Students.create(body).save()
    }

    // @Authorized()
    @Delete('/students/:id')
    async removeStudent(
        @Param('id') id: number
    ) {
        const student = await Students.findOne(id)
        if (!student) throw new NotFoundError("Student doesn't exist")
        
        await Students.remove(student)

        return "removed!"
        }


    // // @Authorized()
    @Put('/students/:id')
    async editStudent(
        // @Param('batchId') batchId: number,
        @Param('id') studentId: number,
        @Body() update: Partial<Students>
    ) {
        // const batch = await Batch.findOne(batchId)
        const student = await Students.findOne(studentId)
        // if (!batch) throw new NotFoundError("Batch doesn't exist")
        if (!student) throw new NotFoundError("Batch doesn't exist")

        return Students.merge(student, update).save()
    }

}