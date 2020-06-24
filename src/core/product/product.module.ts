import { Module, NestModule, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { ProductController } from './controller/product.controller';
import { ProductService } from './service/product.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { Product } from 'src/shared/models/core/product.interface';
import { CheckSliceMiddleware } from './middleware/check-slice.middleware';

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
  configure (consumer: MiddlewareConsumer) {
    consumer
      .apply(
        CheckSliceMiddleware
      )
      .forRoutes(
        {
        path: 'product',
        method: RequestMethod.POST
        },
        {
        path: 'product',
        method: RequestMethod.PUT
        }
      );
  }
}
