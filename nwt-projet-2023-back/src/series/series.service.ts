import { Observable, catchError, defaultIfEmpty, filter, map, mergeMap, of, throwError } from 'rxjs';
import { SerieEntity } from './entities/serie.entity';
import { CreateSerieDto } from './dtos/create-serie.dto';
import { UpdateSerieDto } from './dtos/update-serie.dto';
import { ConflictException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
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

    create(serie: CreateSerieDto): Observable<SerieEntity> {
        return this._prepareNewSerie(serie).pipe(
            mergeMap((newPreparedSerie: CreateSerieDto) =>
              this._serieDao.save(newPreparedSerie),
            ),
            catchError((e) =>
              e.code === 11000
                ? throwError(
                    () =>
                      new ConflictException(
                        `Serie with title '${serie.title}' already exists`,
                      ),
                  )
                : throwError(() => new UnprocessableEntityException(e.message)),
            ),
            map((serieCreated) => new SerieEntity(serieCreated)),
          );
    }

    update(id: string, serie: UpdateSerieDto): Observable<SerieEntity> {
        return this._serieDao.update(id, serie).pipe(
            catchError((e) =>
              e.code === 11000
                ? throwError(
                    () =>
                      new ConflictException(
                        `Serie with title '${serie.title}' already exists`,
                      ),
                  )
                : throwError(() => new UnprocessableEntityException(e.message)),
            ),
            mergeMap((serieUpdated) =>
              !!serieUpdated
                ? of(new SerieEntity(serieUpdated))
                : throwError(
                    () => new NotFoundException(`Serie with id '${id}' not found`),
                  ),
            ),
          );
    }

    delete(id: string): Observable<void> {
        return this._serieDao.remove(id).pipe(
            catchError((e) =>
              throwError(() => new UnprocessableEntityException(e.message)),
            ),
            mergeMap((serieDeleted) =>
              !!serieDeleted
                ? of(undefined)
                : throwError(
                    () => new NotFoundException(`Serie with id '${id}' not found`),
                  ),
            ),
          );
    }

    setCover(id: string, filePath: string): Observable<SerieEntity | void> {
        return this._serieDao.updateCover(id, filePath).pipe(
            catchError((e) => throwError(() => new UnprocessableEntityException(e.message)),
            ),
            mergeMap((serieUpdated) =>
              !!serieUpdated
                ? of(new SerieEntity(serieUpdated))
                : throwError(
                    () => new NotFoundException(`Serie with id '${id}' not found`),
                  ),
            ),
          );

    }

    seen(id: string, seen: boolean): Observable<SerieEntity> {
        return this._serieDao.seen(id, seen).pipe(
            catchError((e) => throwError(() => new UnprocessableEntityException(e.message)),
            ),
            mergeMap((serieUpdated) =>
              !!serieUpdated
                ? of(new SerieEntity(serieUpdated))
                : throwError(
                    () => new NotFoundException(`Serie with id '${id}' not found`),
                  ),
            ),
          );

    }

    private _prepareNewSerie = (
        serie: CreateSerieDto,
      ): Observable<CreateSerieDto> =>
        of({
          ...serie,
        });
}
