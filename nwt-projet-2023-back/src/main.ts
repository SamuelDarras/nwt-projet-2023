import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as Config from 'config'
import { SeriesModule } from './series/series.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // create swagger options
  const options = new DocumentBuilder()
    .setTitle(Config.get<string>("swagger.title"))
    .setDescription(Config.get<string>("swagger.description"))
    .setVersion(Config.get<string>("swagger.version"))
    .addTag(Config.get<string>("swagger.tag"))
    .build();

  // create swagger document
  const peopleDocument = SwaggerModule.createDocument(app, options, {
    include: [SeriesModule],
  });

  // setup swagger module
  SwaggerModule.setup(Config.get<string>("swagger.path"), app, peopleDocument);

  await app.listen(3000);
}
bootstrap();
