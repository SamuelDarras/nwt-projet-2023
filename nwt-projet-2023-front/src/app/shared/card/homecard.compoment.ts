import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Serie } from '../types/serie.type';
import { Router } from '@angular/router';
import { SerieService } from '../services/serie.service';

@Component({
  selector: 'nwt-homecard',
  templateUrl: './homecard.component.html',
  styleUrls: ['./homecard.component.css']
})
export class HomeCardComponent implements OnInit {
  // private property to store serie value
  private _serie: Serie;
  /**
   * Component constructor
   */
  constructor(
    private _router: Router,
    private _seriesService: SerieService
  ) {
    this._serie = {} as Serie;
  }

  /**
   * Returns private property _serie
   */
  get serie(): Serie {
    return this._serie;
  }

  /**
   * Sets private property _serie
   */
  @Input()
  set serie(serie: Serie) {
    this._serie = serie;
  }

  seen(id: string | undefined, v: boolean) {
    this._serie.seen = !v
    this._seriesService.seen(id, v)
  }

  /**
   * OnInit implementation
   */
  ngOnInit(): void {
  }

  /**
   * Function to navigate to current person
   */
  navigate(id: string | undefined): void {
    this._router.navigate(['/serie', id]);
  }


}
