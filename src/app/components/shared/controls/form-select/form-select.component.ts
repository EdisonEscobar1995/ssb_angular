import {
  OnChanges,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  SkipSelf,
} from '@angular/core';
import { ControlContainer } from '@angular/forms';

export const factoryFormField = (container: ControlContainer) => container;

type ItemSelectType = string | null | number;

@Component({
  selector: 'form-select',
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: factoryFormField,
      deps: [[new SkipSelf(), ControlContainer]],
    },
  ],
  styles: [
    `
      .was-validated .form-control:invalid,
      .form-control.is-invalid {
        background-position: right calc(1em + 0.1875rem) center;
      }
    `,
  ],
  template: `
    <div class="form-group">
      <label [for]="selectId"> {{ selectLabel }}</label>
      <div>
        <select
          class="form-control"
          [formControlName]="controlName"
          [name]="controlName"
          [ngClass]="{ 'is-invalid': error }"
          [id]="selectId"
          (change)="change($event.target)"
        >
          <option value="" disabled>Seleccionar</option>
          <option
            *ngFor="let item of items"
            [id]="item[option.value]"
            [value]="item[option.value]"
            [selected]="isSelected(item)"
          >
            {{ computedText(item) }}
          </option>
        </select>
      </div>

      <ng-content select="form-field-error"></ng-content>
    </div>
  `,
})
export class FormSelectComponent implements OnChanges {
  constructor(private readonly _cd: ChangeDetectorRef) {}
  @Input() controlName!: string;
  @Input() error?: boolean = false;
  @Input('id') selectId: string = '';
  @Input('label') selectLabel: string = '';
  @Input() items!: any[];
  @Input() textWithValue?: boolean = false;
  @Input() textCustomWithValue?: string;

  @Input() option: {
    text: string;
    value: string;
  } = {
    text: 'text',
    value: 'value',
  };
  @Input() selected?: ItemSelectType;
  @Input() showTooltip?: boolean = false;
  @Output() onchange = new EventEmitter<any>();

  itemSelected: any;

  ngOnChanges(): void {
    this._cd.detectChanges();
  }

  change(e: any) {
    const { value } = e;
    this.onchange.emit(value);
  }

  computedText(item?: any) {
    if (!item) return '';

    if (this.textWithValue) {
      const key = !!this.textCustomWithValue
        ? this.textCustomWithValue
        : this.option.value;

      return `${item[key]} - ${item[this.option.text]}`;
    }
    return item[this.option.text];
  }

  isSelected(item: any): boolean {
    const founded = item[this.option.value] === this.selected;
    if (founded) {
      this.itemSelected = item;
    }

    return founded;
  }
}
