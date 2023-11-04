import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { SerieEntity } from './entities/serie.entity';
import { CreateSerieDto } from './dtos/create-serie.dto';

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
}
