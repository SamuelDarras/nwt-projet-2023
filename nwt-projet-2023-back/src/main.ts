import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as Config from 'config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true
    }));

  const options = new DocumentBuilder()
    .setTitle(Config.get<string>("swagger.title"))
    .setDescription(Config.get<string>("swagger.description"))
    .setVersion(Config.get<string>("swagger.version"))
    .addTag(Config.get<string>("swagger.tag"))
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup(Config.get<string>("swagger.path"), app, document)

  await app.listen(3000);
}
bootstrap();
