import { Component, EventEmitter, Input, OnChanges, OnInit, Output,} from '@angular/core';
  import { Serie } from '../types/serie.type';
  import { FormControl, FormGroup, Validators } from '@angular/forms';
  //import { CustomValidators } from './custom-validators';

  @Component({
    selector: 'nwt-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css'],
  })
  export class FormComponent implements OnInit, OnChanges {
    // private property to store update mode flag
    private _isUpdateMode: boolean;
    // private property to store model value
    private _model: Serie;
    // private property to store cancel$ value
    private readonly _cancel$: EventEmitter<void>;
    // private property to store submit$ value
    private readonly _submit$: EventEmitter<Serie>;
    // private property to store form value
    private readonly _form: FormGroup;

    /**
     * Component constructor
     */
    constructor() {
      this._model = {} as Serie;
      this._isUpdateMode = false;
      this._submit$ = new EventEmitter<Serie>();
      this._cancel$ = new EventEmitter<void>();
      this._form = this._buildForm();
    }

    /**
     * Sets private property _model
     */
    @Input()
    set model(model: Serie) {
      this._model = model;
    }

    /**
     * Returns private property _model
     */
    get model(): Serie {
      return this._model;
    }

    /**
     * Returns private property _form
     */
    get form(): FormGroup {
      return this._form;
    }

    /**
     * Returns private property _isUpdateMode
     */
    get isUpdateMode(): boolean {
      return this._isUpdateMode;
    }

    /**
     * Returns private property _cancel$
     */
    @Output('cancel')
    get cancel$(): EventEmitter<void> {
      return this._cancel$;
    }

    /**
     * Returns private property _submit$
     */
    @Output('submit')
    get submit$(): EventEmitter<Serie> {
      return this._submit$;
    }

    /**
     * OnInit implementation
     */
    ngOnInit(): void {}

    /**
     * Function to handle component update
     */
    ngOnChanges(record: any): void {
      if (record.model && record.model.currentValue) {
        this._model = record.model.currentValue;
        this._isUpdateMode = true;
      } else {
        this._model = {
          cover: 'empty.jpg',
          title: '',
          description: '',
          releaseDate: 0,
          seasonsCount: 0,
        };
        this._isUpdateMode = false;
      }

      // update form's values with model
      this._form.patchValue(this._model);
    }

    /**
     * Function to emit event to cancel process
     */
    cancel(): void {
      this._cancel$.emit();
    }

    /**
     * Function to emit event to submit form and serie
     */
    submit(serie: Serie): void {
      this._submit$.emit(serie);
    }


    /**
     * Function to build our form
     */
    private _buildForm(): FormGroup {
      return new FormGroup({
        id: new FormControl(),
        cover: new FormControl(),
        title: new FormControl(
          '',
          Validators.compose([Validators.required, Validators.minLength(2)])
        ),
        entity: new FormControl(),
        description: new FormControl(
          '',
          Validators.compose([Validators.required])
        ),
        releaseDate: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            //Validators.pattern('(0|\\+33)\\d{9}'), TODO
          ])
        ),
        seasonsCount: new FormControl(
            '',
            Validators.compose([
              Validators.required,
              //Validators.pattern('(0|\\+33)\\d{9}'), TODO
            ])
        ),
      });
    }
  }
