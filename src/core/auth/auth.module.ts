import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { User } from 'src/shared/models/user/user.interface';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';

@Module({
    imports: [
        TypegooseModule.forFeature([
            User
        ])
    ],
    controllers: [
        AuthController
    ],
    providers: [
        AuthService
    ],
})
export class AuthModule {}
