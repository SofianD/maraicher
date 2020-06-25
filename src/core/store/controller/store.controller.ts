import { Controller, Post, Body, HttpException, HttpStatus, Get, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { StoreService } from '../service/store.service';
import { AuthGuard } from 'src/shared/middlewares/auth/auth.guard';

@Controller('store')
export class StoreController {

    constructor (
        private readonly storeService: StoreService
    ) {}

    @Post()
    @UseGuards(AuthGuard)
    async create(
        @Body('data') data
    ) {
        let result;
        try {
            result = await this.storeService.create(data.store);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
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
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return store;
    }

    @Put('/:id')
    @UseGuards(AuthGuard)
    async updateStore(
        @Param('id') id: string,
        @Body('data') data
    ) {
        let result;
        try {
            result = await this.storeService.update(id, data.store);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return result;
    }

    @Delete('/:id')
    @UseGuards(AuthGuard)
    async deleteStore(
        @Param('id') id: string
    ) {
        let result;
        try {
            result = await this.storeService.delete(id);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        if (result.deletedCount === 0) {
            throw new HttpException({ message: 'Deletion failed'}, HttpStatus.BAD_REQUEST);
        }

        return;
    }
}
