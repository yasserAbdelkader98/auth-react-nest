import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import {
  AUTH_COOKIE_NAME,
  AUTH_COOKIE_SECURITY_NAME,
} from './auth/auth-cookie.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.use(cookieParser());

  //ENABLE CORS
  app.enableCors({
    origin: process.env.FRONTEND_URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  //GLOBAL VALIDATION MIDDLEWARE FOR ALL DTOS
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  //LOGGER
  app.use(morgan('dev'));

  //API DOCS
  const config = new DocumentBuilder()
    .setTitle('Auth App')
    .setDescription('Auth App API documentation')
    .setVersion('1.0')
    .addCookieAuth(
      AUTH_COOKIE_NAME,
      { type: 'apiKey' },
      AUTH_COOKIE_SECURITY_NAME,
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(process.env.PORT || 3000);
}
void bootstrap();
