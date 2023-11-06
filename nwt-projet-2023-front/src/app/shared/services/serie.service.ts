import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import environment from "../../../../environments/environment"
import { Observable, defaultIfEmpty, filter } from 'rxjs';
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
        filter((series: Serie) => !!series),
      )
  }
}
