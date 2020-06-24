import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { UserModule } from './core/user/user.module';
import { AuthModule } from './core/auth/auth.module';

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
    UserModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
