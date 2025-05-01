import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

const PORT = process.env.PORT || 3005;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1️⃣ Enable CORS immediately
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://drm-video-server.vercel.app',
      'drm-video-server.vercel.app',
      'https://drm-hls-site-test.netlify.app',
      'drm-hls-site-test.netlify.app'
    ],
    credentials: true,
  });

  // 2️⃣ Apply other middleware
  app.use(cookieParser());

  await app.listen(PORT);
  console.log(`Server listening on http://localhost:${PORT}`);
}
bootstrap();

// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { INestApplication } from '@nestjs/common';
// import * as cookieParser from 'cookie-parser';

// const PORT = process.env.PORT || 3005;

// const resolveAppMiddlewares = (app: INestApplication) => {
//   app.use(cookieParser());
//   app.enableCors({
//     origin: ['http://localhost:3000', 'https://drm-video-server.vercel.app'], // put your frontend endpoints here
//     credentials: true, // allows frontend to receive cookies from backend
//   });
// };

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   resolveAppMiddlewares(app);
//   await app.listen(PORT);
// }

// bootstrap();
