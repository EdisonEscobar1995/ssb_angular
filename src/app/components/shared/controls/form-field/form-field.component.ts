import { Component, Input, SkipSelf } from '@angular/core';
import { ControlContainer } from '@angular/forms';

export const factoryFormField = (container: ControlContainer) => container;

@Component({
  selector: 'form-field',
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: factoryFormField,
      deps: [[new SkipSelf(), ControlContainer]],
    },
  ],
  templateUrl: './form-field.component.html',
})
export class FormFieldComponent {
  @Input() controlName!: string;
  @Input() error?: boolean = false;
  @Input('id') inputId: string = '';
  @Input() placeHolder: string = '';
  @Input('label') inputLabel: string = '';
  @Input('type') inputType: 'password' | 'text' | 'email' | 'number' = 'text';
}
