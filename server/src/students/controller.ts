import {JsonController, Get, Param, Body, Post, NotFoundError, HttpCode, Delete, Put, BadRequestError } from 'routing-controllers'
import Students from './entity'
import Batches from '../batches/entity';

@JsonController()
export default class StudentController {
    
    @Get('/batches/:id([0-9]+)/students')
    async getStudentsByBatch(
      @Param('id') batchId: number
    ) {
      const batches = await Batches.findOne(batchId)
      if (!batches) throw new NotFoundError('Batch not found!')
  
      return batches.students

    }

    @Get('/students/:id([0-9]+)')
    async getStudentById(
      @Param('id') studentId: number
    ) {
      const studentById = await Students.findOne(studentId)
      if (!studentById) throw new NotFoundError('Student doesn\'t exist')
      if (studentById) {
        return studentById
      }
    }

    @Post('/batches/:id([0-9]+)/students')
    @HttpCode(201)
    async createStudent(
      @Body() student: Students,
      @Param('id') batchId: number
    ) {
      const batches = await Batches.findOne(batchId)
      if(!batches) throw new BadRequestError("Batch doesn't exist.")
  
      const createdStudent = await Students.create({...student, batches}).save()
  
      return createdStudent
    }


    @Delete('/students/:id([0-9]+)')
    async deleteStudent(
      @Param('id') studentId: number
    ) {
      const student = await Students.findOne(studentId)
      if(!student) throw new NotFoundError('Student not found.')
  
      await student.remove()

      return { id: studentId }
    }

    @Put('/students/:id')
    async updateStudent(
        @Param('id') studentId: number,
        @Body() update: Partial<Students> 
    ) {
        const student = await Students.findOne(studentId)
        if (!student) throw new NotFoundError('Student was not found')
        const studentUpdated = Students.merge(student, update)
        const entity = await studentUpdated.save()
        return entity
    }

}