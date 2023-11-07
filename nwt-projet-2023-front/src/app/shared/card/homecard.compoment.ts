import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Serie } from '../types/serie.type';

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
  constructor() {
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


  /**
   * OnInit implementation
   */
  ngOnInit(): void {
  }


}
