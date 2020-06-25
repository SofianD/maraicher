import { Controller, Get, Body, Param, HttpException, HttpStatus, Post, Put, Delete, UseGuards } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { AuthGuard } from 'src/shared/middlewares/auth/auth.guard';

@Controller('user')
export class UserController {

    constructor(
        private readonly userService: UserService
    ) {}

    @Get('/:id')
    @UseGuards(AuthGuard)
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
    @UseGuards(AuthGuard)
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
    @UseGuards(AuthGuard)
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
    @UseGuards(AuthGuard)
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
