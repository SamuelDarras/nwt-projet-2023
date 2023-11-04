import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { SerieEntity } from './entities/serie.entity';
import { CreateSerieDto } from './dtos/create-serie.dto';
import { UpdateSerieDto } from './dtos/update-serie.dto';

@Injectable()
export class SeriesService {
    findAll(): Observable<SerieEntity[] | void> {
        throw new Error('Method not implemented.');
    }

    findOne(id: number): Observable<SerieEntity | void> {
        throw new Error('Method not implemented.');
    }

    create(createSerieDto: CreateSerieDto): Observable<SerieEntity | void> {
        throw new Error('Method not implemented.');
    }

    update(updateSerieDto: UpdateSerieDto): Observable<void | SerieEntity> {
        throw new Error('Method not implemented.');
    }

    delete(id: number): Observable<void> {
        throw new Error('Method not implemented.');
    }
}
