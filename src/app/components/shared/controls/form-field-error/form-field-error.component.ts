import { Component, Input } from '@angular/core';

@Component({
  selector: 'form-field-error',
  template: `<small class="invalid-feedback">{{ error }}</small>`,
  styles: [
    `
      .invalid-feedback {
        display: initial;
      }
    `,
  ],
})
export class FormFieldErrorComponent {
  @Input() error: string = '';
}
