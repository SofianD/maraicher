import { Module } from '@nestjs/common';
import { StoreController } from './controller/store.controller';
import { StoreService } from './service/store.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { Store } from 'src/shared/models/core/store.interface';

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
export class StoreModule {}
