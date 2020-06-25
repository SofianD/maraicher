import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { StoreController } from './controller/store.controller';
import { StoreService } from './service/store.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { Store } from 'src/shared/models/core/store.interface';
import { IsStoreOwnerMiddleware } from 'src/shared/middlewares/owner/is-store-owner.middleware';

@Module({
  imports: [
    TypegooseModule.forFeature([
      Store
    ])
  ],
  controllers: [
    StoreController
  ],
  providers: [
    StoreService
  ]
})
export class StoreModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        IsStoreOwnerMiddleware
      )
      .forRoutes(
        {
          path: 'store',
          method: RequestMethod.PUT
        },
        {
          path: 'store',
          method: RequestMethod.DELETE
        }
      );
  }
}
