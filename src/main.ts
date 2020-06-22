import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();

  // If issue 'req too large' exist:
  // app.use(json({
  //   limit: '50mb'
  // }));
  await app.listen(3000);
  console.log('Connected.');
}

bootstrap();
