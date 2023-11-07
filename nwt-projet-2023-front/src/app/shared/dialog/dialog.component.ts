import { Component, Inject, OnInit, Optional } from '@angular/core';
import { Serie } from '../types/serie.type';
import { MAT_DIALOG_DATA, MatDialogRef, } from '@angular/material/dialog';


@Component({
  selector: 'nwt-add-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  /**
   * Component constructor
   */
  constructor(
    private _dialogRef: MatDialogRef<DialogComponent, Serie>,
    @Optional() @Inject(MAT_DIALOG_DATA) private _serie: Serie
  ) {}

  /**
   * Returns serie passed in dialog open
   */
  get serie(): Serie {
    return this._serie;
  }

  /**
   * OnInit implementation
   */
  ngOnInit(): void {}

  /**
   * Function to cancel the process and close the modal
   */
  onCancel(): void {
    this._dialogRef.close();
  }

  /**
   * Function to close the modal and send serie to parent
   */
  onSave(serie: Serie): void {
    this._dialogRef.close(serie);
  }
}