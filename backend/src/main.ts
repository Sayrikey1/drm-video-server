import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

const PORT = process.env.PORT || 3005;

const resolveAppMiddlewares = (app: INestApplication) => {
  app.use(cookieParser());
  app.enableCors({
    origin: ['http://localhost:3000'], // put your frontend endpoints here
    credentials: true, // allows frontend to receive cookies from backend
  });
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  resolveAppMiddlewares(app);
  await app.listen(PORT);
}
bootstrap();
