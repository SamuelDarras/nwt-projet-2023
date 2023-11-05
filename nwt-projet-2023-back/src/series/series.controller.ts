import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { SeriesService } from './series.service';
import { Observable } from 'rxjs';
import { SerieEntity } from './entities/serie.entity';
import { CreateSerieDto } from './dtos/create-serie.dto';
import { ApiOkResponse, ApiNoContentResponse, ApiTags } from "@nestjs/swagger";
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('series')
@Controller('series')
export class SeriesController {
    constructor(private readonly _seriesService: SeriesService) {}

    @ApiOkResponse({
        description: 'Returns an array of series',
        type: SerieEntity,
        isArray: true,
    })
    @ApiNoContentResponse({ description: 'No serie exists in database' })
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

    @Delete(':id')
    delete(@Param('id') id: number): Observable<void> {
        return this._seriesService.delete(id)
    }
}
