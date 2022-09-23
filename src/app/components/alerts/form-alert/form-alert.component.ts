import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-form-alert',
  templateUrl: './form-alert.component.html',
  styleUrls: ['./form-alert.component.scss']
})
export class FormAlertComponent implements OnInit {
  form!: FormGroup;

  constructor(private readonly formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<FormAlertComponent>,
    @Inject(MAT_DIALOG_DATA) data: any) {
    console.log('data === ', data);
  }

  private setValuesFieldsForm() {
    this.form && this.resetForm();
    this.form = this.formBuilder.group({
      enterpriseId: ['', [Validators.required]],
    });
  }

  getError(field: string, aliasError: string) {
    const getError =
      this.form.get(field)?.hasError(aliasError) &&
      this.form.get(field)?.touched;
    return !!getError;
  }

  private resetForm() {
    this.form.reset();
    this.form.markAsPristine();
    this.form.markAsUntouched()
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.setValuesFieldsForm();
  }

}

