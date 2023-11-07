import { Component } from '@angular/core';
import { SerieService } from '../shared/services/serie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { concat, filter, mergeMap } from 'rxjs';
import { Serie } from '../shared/types/serie.type';

@Component({
  selector: 'app-serie-card',
  templateUrl: './serie-card.component.html',
  styleUrls: ['./serie-card.component.css']
})
export class SerieCardComponent {
  private _serie: Serie

  constructor(private _serieService: SerieService, private _route: ActivatedRoute, private _router: Router) {
    this._serie = {
      title: "Breaking Bad",
      description: "Walter « Walt » White est professeur de chimie dans une école secondaire. Il vit à Albuquerque, au Nouveau-Mexique, avec son fils handicapé moteur et son épouse enceinte. Le lendemain de son cinquantième anniversaire, on lui diagnostique un cancer du poumon en phase terminale avec une espérance de vie estimée à deux ans. Tout s'effondre pour lui. Il décide alors de mettre en place un laboratoire et un trafic de méthamphétamine pour assurer un avenir financier confortable à sa famille après sa mort, en s'associant à Jesse Pinkman, un de ses anciens élèves devenu petit trafiquant.",
      releaseDate: Date.parse("2008-01-20"),
      seasonsCount: 5,
    }
  }

  ngOnInit(): void {
    console.log(this._serie)
    this._route.params.pipe(
      filter((params: any) => !!params.id),
      mergeMap((params: any) => this._serieService.fetchOne(params.id)),
    ).subscribe({
      next: (serie: Serie) => {
          this._serie = serie
        }
    })
  }

  delete() {
    if (!!this._serie.id) {
      this._serieService.delete(this._serie.id).subscribe()
      this._router.navigate(['/home'])
    }
  }

  get serie(): Serie {
    return this._serie
  }
}
