import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypegooseModule.forRoot(
      "mongodb+srv://server:QLbDkTQGb4pv3uMS@cluster0-tlo9o.mongodb.net/<dbname>?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      }
    ),
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
