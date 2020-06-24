import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { User } from 'src/shared/models/user/user.interface';

@Module({
    imports: [
        TypegooseModule.forFeature([
            User
        ])
    ],
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule {}
