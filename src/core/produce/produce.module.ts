import { Module, NestModule, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { ProduceController } from './controller/produce.controller';
import { ProduceService } from './service/produce.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { Produce } from 'src/shared/models/core/produce.interface';
import { IsProduceOwnerMiddleware } from 'src/shared/middlewares/owner/is-produce-owner.middleware';

@Module({
  imports: [
    TypegooseModule.forFeature([
      Produce
    ])
  ],
  controllers: [
    ProduceController
  ],
  providers: [
    ProduceService
  ]
})
export class ProduceModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        IsProduceOwnerMiddleware
      )
      .forRoutes(
        {
          path: 'product',
          method: RequestMethod.PUT
        },
        {
          path: 'product',
          method: RequestMethod.DELETE
        }
      );
  }
}