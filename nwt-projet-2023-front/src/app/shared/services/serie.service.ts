import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import environment from "../../../../environments/environment"
import { Observable, defaultIfEmpty, filter, map, of } from 'rxjs';
import { Serie } from '../types/serie.type';

@Injectable({
  providedIn: 'root'
})
export class SerieService {
  private readonly _backendUrl = environment.backend.protocol + "://" + environment.backend.url + ":" + environment.backend.port + "/"

  constructor(private _http: HttpClient) {}

  fetch(): Observable<Serie[]> {
    return this._http.get<Serie[]>(this._backendUrl + environment.backend.endpoints.allSeries)
      .pipe(
        filter((series: Serie[]) => !!series),
        defaultIfEmpty([])
      )
  }

  fetchOne(id: any): Observable<Serie> {
    return this._http.get<Serie>(this._backendUrl + environment.backend.endpoints.oneSerie.replace(":id", id))
      .pipe(
        filter((serie: Serie) => !!serie),
      )
  }

  create(serie: Serie): Observable<any> {
    return this._http.post<Serie>(
      this._backendUrl + environment.backend.endpoints.create,
      serie,
      this._options()
    )
  }

  update(id: string, serie: Serie): Observable<any> {
    return this._http.put<Serie>(
      this._backendUrl + environment.backend.endpoints.update.replace(":id", id),
      serie,
      this._options()
    )
  }

  delete(id: string): Observable<string> {
    console.log(id)
    return this._http.delete(
      this._backendUrl + environment.backend.endpoints.delete.replace(":id", id),
      this._options()
    ).pipe(map(() => id))
  }

  setCover(id: string): Observable<any> {
    return this._http.delete(
      this._backendUrl + environment.backend.endpoints.cover.replace(":id", id),
      this._options()
    )
  }

  seen(id: string | undefined, v: boolean): Observable<any> {
    let _id = id || ""
    let _v = !v
    return of(this._http.put<Serie>(
      this._backendUrl + environment.backend.endpoints.seen.replace(":id", _id),
      { seen: _v },
      this._options()
    ).subscribe())
  }

  private _options(headerList: object = {}): any {
    return {
      headers: new HttpHeaders(
        Object.assign({ 'Content-Type': 'application/json' }, headerList)
      ),
    };
  }
}
