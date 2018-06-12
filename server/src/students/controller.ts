import { Authorized, JsonController, Get, Param, Put, Body, Post, Delete, NotFoundError, HttpCode } from 'routing-controllers'
import Students from './entity'
import Batch from '../batches/entity';

@JsonController()
export default class StudentController {
    
    @Authorized()
    @Get('/students')
    allBatches() {
        return Students.find()
    }
    
    @Authorized()
    @Get('/students/:id')
    async getStudentById(
        @Param('id') id: number
    ) {
        const studentById = await Students.findOne(id)
        return {studentById}
    }

    // @Authorized()
    @Post('/students')
    async createStudent(
        @Body() students: Students,
    ){
        const batch = (await Batch.findOne(students.batch))!
        students.batch = batch
        if(!batch) throw new NotFoundError("Batch doesn't exist")

        return students.save()
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