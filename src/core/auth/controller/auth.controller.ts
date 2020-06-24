import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';


@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) {}

    @Post()
    async login(
        @Body('data') data
    ) {
        let userInDb;
        try {
            userInDb = await this.authService.find(data.email);
        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        
        if (userInDb === null) throw new HttpException('Not find', HttpStatus.NOT_FOUND);
        
        if (!bcrypt.compare(data.password, userInDb.password)) throw new HttpException('Auth failed.', HttpStatus.FORBIDDEN);
        
        const {__v, password, ...user} = userInDb;

        return {
            user: user,
            accessToken: jwt.sign(
                { key: user._id },
                '167CD8DC2E719C1CE671DBAEA8437'
            )
        }
    }
}
