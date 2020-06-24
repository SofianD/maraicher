import { Controller, Get, Body, Param, HttpException, HttpStatus, Post, Put, Delete } from '@nestjs/common';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {

    constructor(
        private readonly userService: UserService
    ) {}

    @Get('/:id')
    async getUserById(
        @Param('id') id: string
    ) {
        try {
            await this.userService.findById(id);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return;
    }

    @Get()
    async getUser() {

    }

    @Post()
    async createUser(
        @Body('data') data
    ) {
        let result;
        try {
            result = await this.userService.create(data.user);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return result;
    }

    @Put('/:id')
    async updateUser(
        @Param('id') id: string,
        @Body('data') data
    ) {
        try {
            await this.userService.update(id, data.user);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return;
    }

    @Delete('/:id')
    async deleteUser(
        @Param('id') id: string
    ) {
        let result;
        try {
            result = await this.userService.delete(id);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        if (result.deletedCount === 0) {
            throw new HttpException({ message: 'Deletion failed'}, HttpStatus.BAD_REQUEST);
        }

        return;
    }
}
