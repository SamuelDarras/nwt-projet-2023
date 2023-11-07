import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable, defaultIfEmpty, filter, map, mergeMap } from 'rxjs';
import { DialogComponent } from '../shared/dialog/dialog.component';
import { SerieService } from '../shared/services/serie.service';
import { Serie } from '../shared/types/serie.type';
import { Router } from '@angular/router';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  // private property to store series value
  private _series: Serie[];
  // private property to store dialogStatus value
  private _dialogStatus: string;
  // private property to store dialog reference
  private _seriesDialog: MatDialogRef<DialogComponent, Serie> | undefined;

  /**
   * Component constructor
   */
  constructor(
    private _seriesService: SerieService,
    private _dialog: MatDialog,
  ) {
    this._series = [];
    this._dialogStatus = 'inactive';
    var serie = {
      title: "Breaking Bad",
      description: "Walter « Walt » White est professeur de chimie dans une école secondaire. Il vit à Albuquerque, au Nouveau-Mexique, avec son fils handicapé moteur et son épouse enceinte. Le lendemain de son cinquantième anniversaire, on lui diagnostique un cancer du poumon en phase terminale avec une espérance de vie estimée à deux ans. Tout s'effondre pour lui. Il décide alors de mettre en place un laboratoire et un trafic de méthamphétamine pour assurer un avenir financier confortable à sa famille après sa mort, en s'associant à Jesse Pinkman, un de ses anciens élèves devenu petit trafiquant.",
      releaseDate: Date.parse("2008-01-20"),
      seasonsCount: 5,
      seen: false,
    }
    this._series.push(serie);
    this._series.push(serie);
    this._series.push(serie);
    this._series.push(serie);
  }

  /**
   * Returns private property _series
   */
  get series(): Serie[] {
    return this._series;
  }

  /**
   * Returns private property _dialogStatus
   */
  get dialogStatus(): string {
    return this._dialogStatus;
  }

  /**
   * OnInit implementation
   */
  ngOnInit(): void {
    this._seriesService
      .fetch()
      .pipe(
        filter((series: Serie[]) => !!series),
        defaultIfEmpty([])
      )
      .subscribe({ next: (series: Serie[]) => (this._series = series) });
  }

  /**
   * Function to display modal
   */
  showDialog(): void {
    // set dialog status
    this._dialogStatus = 'active';

    // open modal
    this._seriesDialog = this._dialog.open(DialogComponent, {
      width: '500px',
      disableClose: true,
    });

    // subscribe to afterClosed observable to set dialog status and do process
    this._seriesDialog
      .afterClosed()
      .pipe(
        filter((serie: Serie | undefined) => !!serie),
        map((serie: Serie | undefined) => {
          // delete obsolete attributes in original object which are not required in the API
          delete serie?.cover;

          return serie;
        }),
        mergeMap((serie: Serie | undefined) => this._add(serie))
      )
      .subscribe({
        next: (serie: Serie) => (this._series = this._series.concat(serie)),
        error: () => (this._dialogStatus = 'inactive'),
        complete: () => (this._dialogStatus = 'inactive'),
      });
  }

  /**
   * Add new serie
   */
  private _add(serie: Serie | undefined): Observable<Serie> {
    return this._seriesService.create(serie as Serie);
  }

}
