import { Controller, Post, Body, HttpException, HttpStatus, Get, Param, Put, Delete } from '@nestjs/common';
import { StoreService } from '../service/store.service';

@Controller('store')
export class StoreController {

    constructor (
        private readonly storeService: StoreService
    ) {}

    @Post()
    async create(
        @Body('data.store') store
    ) {
        let result;
        try {
            result = await this.storeService.create(store);
        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return result;
    }

    @Get('/:id')
    async getOneStore(
        @Param('id') id
    ) {
        let store;
        try {
            store = await this.storeService.findById(id);
        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return store;
    }

    @Put('/:id')
    async updateStore(
        @Param('id') id: string,
        @Body('data.store') store
    ) {
        let result;
        try {
            result = await this.storeService.update(id, store);
        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return result;
    }

    @Delete('/:id')
    async deleteStore(
        @Param('id') id: string
    ) {
        let result;
        try {
            result = await this.storeService.delete(id);
        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        if (result.deletedCount === 0) {
            throw new HttpException({ message: 'Deletion failed'}, HttpStatus.BAD_REQUEST);
        }

        return;
    }
}
