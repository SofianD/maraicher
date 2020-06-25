import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { User } from 'src/shared/models/user/user.interface';
import { IsAccountOwnerMiddleware } from 'src/shared/middlewares/owner/is-account-owner.middleware';

@Module({
    imports: [
        TypegooseModule.forFeature([
            User
        ])
    ],
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
        .apply(
            IsAccountOwnerMiddleware
        )
        .exclude(
            {
                path: 'user',
                method: RequestMethod.POST
            }
        );
    }
}
