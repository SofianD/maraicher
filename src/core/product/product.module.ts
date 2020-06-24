import { Module } from '@nestjs/common';
import { ProductController } from './controller/product.controller';
import { ProductService } from './service/product.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { Product } from 'src/shared/models/core/product.interface';

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
export class ProductModule {}
