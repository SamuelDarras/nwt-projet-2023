import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SeriesModule } from './series/series.module';
import * as Config from 'config';

@Module({
  imports: [SeriesModule, MongooseModule.forRoot(Config.get<string>('mongodb.uri'))],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
