import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

@Module({
  imports: [
    // TypegooseModule.forRoot(
    //   'ma bdd',
    //   {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true
    //   }
    // )
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
