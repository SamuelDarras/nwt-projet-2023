import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SerieService } from '../shared/services/serie.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../shared/dialog/dialog.component';
import { Serie } from '../shared/types/serie.type';
import { filter, map, mergeMap } from 'rxjs';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent {
  private _serieDialog: MatDialogRef<DialogComponent, Serie> | undefined

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _serieService: SerieService,
    private _dialog: MatDialog
  ) { }

  ngOnInit() {
    this._route.params.pipe(
      map((params: any) => params.id),
      mergeMap((id: string) => this._serieService.fetchOne(id))
    ).subscribe((serie) => this._initModal(serie))
  }

  private _initModal(serie: Serie): void {
    this._serieDialog = this._dialog.open(DialogComponent, {
      width: "500px",
      disableClose: true,
      data: serie
    })

    this._serieDialog
      .afterClosed()
      .pipe(
        filter((serie: Serie | undefined) => !!serie),
        map((serie: Serie | undefined) => {
          const id = serie?.id
          delete serie?.id
          delete serie?.cover

          return { id, update: serie }
        }),
        mergeMap((_: { id: any; update: any }) =>
          this._serieService.update(_.id, _.update)
        )
      ).subscribe({
        error: () => this._router.navigate(["/home"]),
        complete: () => this._router.navigate(["/home"]),
      })
  }
}
