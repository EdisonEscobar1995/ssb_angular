import { Component, Input, SkipSelf } from '@angular/core';
import { ControlContainer } from '@angular/forms';

export const factoryFormField = (container: ControlContainer) => container;

@Component({
  selector: 'form-field-number',
  styles: [
    `
      .input-group-text {
        background-color: initial;
      }
      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      input[type='number'] {
        -moz-appearance: textfield;
      }
      .label {
        display: inline-block;
        margin-bottom: 0.5rem;
      }
    `,
  ],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: factoryFormField,
      deps: [[new SkipSelf(), ControlContainer]],
    },
  ],
  templateUrl: './form-field-number.component.html',
})
export class FormFieldNumberComponent {
  @Input() controlName!: string;
  @Input() error?: boolean = false;
  @Input('id') inputId: string = '';
  @Input() placeHolder: string = '';
  @Input('label') inputLabel: string = '';

  @Input('min') minValue?: number = 1;
  @Input('max') maxValue?: number = 100;
}
