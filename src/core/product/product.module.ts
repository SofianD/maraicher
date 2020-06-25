import { Module, NestModule, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { ProductController } from './controller/product.controller';
import { ProductService } from './service/product.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { Product } from 'src/shared/models/core/product.interface';
import { IsProduceOwnerMiddleware } from 'src/shared/middlewares/owner/is-produce-owner.middleware';

@Module({
  imports: [
    TypegooseModule.forFeature([
      Product
    ])
  ],
  controllers: [
    ProductController
  ],
  providers: [
    ProductService
  ]
})
export class ProductModule implements NestModule {
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