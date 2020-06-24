import { Controller, Post, Body, HttpException, HttpStatus, Get, Put, Param, Delete } from '@nestjs/common';
import { ProductService } from '../service/product.service';

@Controller('product')
export class ProductController {
    constructor(
        private readonly productService: ProductService
    ) {}

    @Post()
    async create(
        @Body('data') data
    ) {
        let result;
        try {
            result = await this.productService.create(data.product);
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
            store = await this.productService.findById(id);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return store;
    }

    @Put('/:id')
    async updateStore(
        @Param('id') id: string,
        @Body('data') data
    ) {
        let result;
        try {
            result = await this.productService.update(id, data.product);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return result;
    }

    @Delete('/:id')
    async deleteStore(
        @Param('id') id: string
    ) {
        let result;
        try {
            result = await this.productService.delete(id);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        if (result.deletedCount === 0) {
            throw new HttpException({ message: 'Deletion failed'}, HttpStatus.BAD_REQUEST);
        }

        return;
    }
}
