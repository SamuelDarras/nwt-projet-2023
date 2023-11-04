import { Module } from '@nestjs/common';
import { SeriesController } from './series.controller';
import { SeriesService } from './series.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Serie, SerieSchema } from './schemas/serie.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Serie.name, schema: SerieSchema }])],
  controllers: [SeriesController],
  providers: [SeriesService]
})
export class SeriesModule {}
