import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { corsOptions } from './configs/cors.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(corsOptions);

  // Thêm prefix cho url api
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Food Delivery')
    .setDescription('Đây là api document cho web Food Delivery')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors) => {
        const errorMessage = Object.values(errors[0].constraints || {});
        const firstMesage = errorMessage[0];

        return new BadRequestException(firstMesage);
      },
    }),
  );

  const configService = app.get(ConfigService);

  await app.listen(configService.get<number>('PORT') ?? 3000);
}

bootstrap();
