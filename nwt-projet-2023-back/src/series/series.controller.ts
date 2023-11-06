import { Body,
	 Controller,
	 Delete,
	 FileTypeValidator,
	 Get,
	 Param,
	 ParseFilePipe,
	 Post,
	 Put,
	 UploadedFile,
	 UseInterceptors } from '@nestjs/common';
import { ApiNoContentResponse,
	 ApiOkResponse,
	 ApiTags,
	 ApiBody,
	 ApiConflictResponse,
	 ApiCreatedResponse,
	 ApiBadRequestResponse,
	 ApiParam,
	 ApiNotFoundResponse } from "@nestjs/swagger";
import { SeriesService } from './series.service';
import { Observable } from 'rxjs';
import { SerieEntity } from './entities/serie.entity';
import { CreateSerieDto } from './dtos/create-serie.dto';
import { UpdateSerieDto } from './dtos/update-serie.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@ApiTags('series')
@Controller('series')
export class SeriesController {
    constructor(private readonly _seriesService: SeriesService) {}

    @ApiOkResponse({
        description: "Returns an array of series",
        type: SerieEntity,
        isArray: true
    })
    @ApiNoContentResponse({
        description: "No series exist in database"
    })
    @Get()
    findAll(): Observable<SerieEntity[] | void> {
        return this._seriesService.findAll()
    }

    @ApiOkResponse({
        description: "Returns the serie with the given 'id'",
        type: SerieEntity,
    })
    @ApiNoContentResponse({
        description: "The serie with the given 'id' does'n exist in database"
    })
    @Get(':id')
    findOne(@Param('id') id: string): Observable<SerieEntity | void> {
        return this._seriesService.findOne(id)
    }

    @ApiCreatedResponse({
        description: 'The serie has been successfully created',
        type: SerieEntity,
    })
    @ApiConflictResponse({
        description: 'The serie already exists in the database',
    })
    @ApiBadRequestResponse({ description: 'Payload provided is not good' })
    @ApiBody({
        description: 'Payload to create a new serie',
        type: CreateSerieDto,
    })
    @Post()
    create(@Body() createSerieDto: CreateSerieDto): Observable<SerieEntity | void> {
        return this._seriesService.create(createSerieDto)
    }

    @ApiOkResponse({
        description: 'The serie has been successfully updated',
        type: SerieEntity,
    })
    @ApiNotFoundResponse({
        description: 'The serie with the given "id" doesn\'t exist in the database'
    })
    @ApiConflictResponse({
        description: 'The serie already exists in the database',
    })
    @ApiBadRequestResponse({ description: 'Payload provided is not good' })
    @ApiBody({
        description: 'Payload to create a new serie',
        type: CreateSerieDto,
    })
    @ApiParam({
        name: 'id',
        description: 'Unique identifier of the serie in the database',
        type: String,
        allowEmptyValue: false,
    })
    @Put(':id')
    update(@Param('id') id: string, @Body() updateSerieDto: UpdateSerieDto): Observable<SerieEntity | void> {
        return this._seriesService.update(id, updateSerieDto)
    }

    @ApiNoContentResponse({
        description: 'The serie has been successfully deleted',
    })
    @ApiNotFoundResponse({
        description: 'The serie with the given "id" doesn\'t exist in the database'
    })
    @ApiBadRequestResponse({ description: 'Payload provided is not good' })
    @ApiParam({
        name: 'id',
        description: 'Unique identifier of the serie in the database',
        type: String,
        allowEmptyValue: false,
    })
    @Delete(':id')
    delete(@Param('id') id: string): Observable<void> {
        return this._seriesService.delete(id)
    }

    @ApiOkResponse({
        description: 'The serie\'s cover has been successfully updated',
        type: SerieEntity,
    })
    @ApiNotFoundResponse({
        description: 'The serie with the given "id" doesn\'t exist in the database'
    })
    @ApiParam({
        name: 'id',
        description: 'Unique identifier of the serie in the database',
        type: String,
        allowEmptyValue: false,
    })
    @Post(':id/cover')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: "./uploads/",
            filename: (_req, file, cb) => {
                cb(null, file.originalname)}
        })
    }))
    setCover(@Param('id') id: string, @UploadedFile(
        new ParseFilePipe({
            validators: [
                new FileTypeValidator({ fileType: ".(png|jpg|jpeg)" })
            ]
        })
    ) file: Express.Multer.File): Observable<SerieEntity | void> {
        return this._seriesService.setCover(id, file.filename)
    }
}
