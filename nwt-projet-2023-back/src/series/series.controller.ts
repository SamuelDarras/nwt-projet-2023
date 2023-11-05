import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from "@nestjs/swagger";
import { SeriesService } from './series.service';
import { Observable } from 'rxjs';
import { SerieEntity } from './entities/serie.entity';
import { CreateSerieDto } from './dtos/create-serie.dto';
import { UpdateSerieDto } from './dtos/update-serie.dto';

@ApiTags('series')
@Controller('series')
export class SeriesController {
    constructor(private readonly _seriesService: SeriesService) {}

    @Get()
    findAll(): Observable<SerieEntity[] | void> {
        return this._seriesService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string): Observable<SerieEntity | void> {
        return this._seriesService.findOne(id)
    }

    @Post()
    create(@Body() createSerieDto: CreateSerieDto): Observable<SerieEntity | void> {
        return this._seriesService.create(createSerieDto)
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateSerieDto: UpdateSerieDto): Observable<SerieEntity | void> {
        return this._seriesService.update(id, updateSerieDto)
    }

    @Delete(':id')
    delete(@Param('id') id: string): Observable<void> {
        return this._seriesService.delete(id)
    }
}
