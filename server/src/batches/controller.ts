import { JsonController, Get, Param, Put, Body, Post, Delete, NotFoundError, HttpCode, Authorized } from 'routing-controllers'
import Batches from './entity'

@JsonController()
export default class BatchesController {

    // @Authorized()
    @Get('/batches')
    getBatches() {
      return Batches.find()
    }
    

    @Get('/batches/:id([0-9]+)')
    @HttpCode(200)
    async getBatch(
      @Param('id') batchId: number
    ) {
      const batch = await Batches.findOne(batchId)
      if (!batch) throw new NotFoundError('Batch does not exist!')
      return batch
    }

    // @Authorized()
    @Post('/batches')
    @HttpCode(201)
    async createBatch(
      @Body() batches: Batches,
    ) {
      const newBatch = await Batches.create(batches).save()
      return newBatch
    }

  }
