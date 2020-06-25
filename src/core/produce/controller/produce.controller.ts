import { Controller, Post, Body, HttpException, HttpStatus, Get, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { ProduceService } from '../service/produce.service';
import { AuthGuard } from 'src/shared/middlewares/auth/auth.guard';

@Controller('produce')
export class ProduceController {
    constructor(
        private readonly productService: ProduceService
    ) {}

    @Post()
    @UseGuards(AuthGuard)
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
    async getOneProduct(
        @Param('id') id
    ) {
        let product;
        try {
            product = await this.productService.findById(id);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return product;
    }

    @Get('all')
    async getProducts() {
        let products;
        try {
            products = await this.productService.findAll();
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        if (products.length === 0) throw new HttpException('Not found.', HttpStatus.NOT_FOUND);

        return products;
    }

    @Put('/:id')
    @UseGuards(AuthGuard)
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
    @UseGuards(AuthGuard)
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
