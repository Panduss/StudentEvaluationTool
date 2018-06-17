import { JsonController, Get, Param, Put, Body, Post, Delete, NotFoundError, HttpCode, Authorized } from 'routing-controllers'
import Batch from './entity'

@JsonController()
export default class BatchController {

    // @Authorized()
    @Get('/batches')
    allBatches() {
        return Batch.find()
    }
    
    // @Authorized()
    @Get('/batches/:id')
    async getBatchById(
        @Param('id') id: number
    ) {
        const batchById = await Batch.findOne(id)
        return batchById
    }

    // @Authorized()
    @Post('/batches')
    @HttpCode(201)
    async createBatch(
        @Body() body: Batch 
    ){
        return Batch.create(body).save()
    }

    // @Authorized()
    @Put('/batches/:id')
    async editBatch(
        @Param('id') id: number,
        @Body() update: Partial<Batch>
    ) {
        const batch = await Batch.findOne(id)
        if (!batch) throw new NotFoundError("Batch doesn't exist")

        return Batch.merge(batch, update).save()
    }

    // @Authorized()
    @Delete('/batches/:id')
    async deleteBatch(
        @Param('id') id: number
    ) {
        const batch = await Batch.findOne(id)
        if (!batch) throw new NotFoundError("Batch doesn't exist")

        await Batch.delete(id)
        return 'Batch deleted'
    }
}