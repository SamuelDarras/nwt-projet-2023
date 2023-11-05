import { Observable, catchError, defaultIfEmpty, filter, map, mergeMap, of, throwError } from 'rxjs';
import { SerieEntity } from './entities/serie.entity';
import { CreateSerieDto } from './dtos/create-serie.dto';
import { UpdateSerieDto } from './dtos/update-serie.dto';
import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { SerieDao } from './daos/serie.dao';

@Injectable()
export class SeriesService {
    constructor(private readonly _serieDao: SerieDao) {}

    findAll(): Observable<SerieEntity[] | void> {
        return this._serieDao.find().pipe(
            filter(Boolean),
            map((series) => (series || []).map((serie) => new SerieEntity(serie))),
            defaultIfEmpty(undefined)
        )
    }

    findOne(id: string): Observable<SerieEntity | void> {
        return this._serieDao.findOneById(id).pipe(
            catchError((e) =>
                throwError(
                    () => new UnprocessableEntityException(e.message)
                )
            ),
            mergeMap((serie) =>
                !!serie
                    ? of(new SerieEntity(serie))
                    : throwError(
                        () => new NotFoundException(`Serie with id '${id}' not found`)
                    )
            )
        )
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
