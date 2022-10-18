import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Alert } from 'src/app/entities/alert';
import { IOptionSelect } from 'src/app/entities/common';

@Component({
  selector: 'app-form-alert',
  templateUrl: './form-alert.component.html',
  styleUrls: ['./form-alert.component.scss']
})
export class FormAlertComponent implements OnInit {
  form!: FormGroup;
  classAlert='';
  mensajeError='';
  showAlertError = false;
  titleModal = '';
  editData: Alert | null = null;

  operationOptions: IOptionSelect[] = [{
    id: "WC",
    name: "Warning cutoff"
  }, {
    id: "WE",
    name: "Warning error"
  }, {
    id: "C",
    name: "Cutoff"
  }, {
    id: "R",
    name: "Recover"
  }];

  optionsBackend: IOptionSelect[] = [{
    id: "LMS",
    name: "LMS"
  }, {
    id: "BDC",
    name: "BDC"
  }, {
    id: "SSB",
    name: "SSB"
  }, {
    id: "INFR",
    name: "INFR"
  }, {
    id: "SCN",
    name: "SCN"
  }, {
    id: "MS",
    name: "MS"
  }, {
    id: "WCO",
    name: "WCO"
  }, {
    id: "STL",
    name: "STL"
  }];

  constructor(
    private readonly formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<FormAlertComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    console.log('data === ', data);
    this.titleModal = data.titleModal;
    this.editData = data.dataEdit || null;
  }

  ngOnInit(): void {
    this.setValuesFieldsForm();
  }

  private setValuesFieldsForm() {
    this.form && this.resetForm();
    this.form = this.formBuilder.group({
      operation: ['', [Validators.required]],
      backend: ['', [Validators.required]],
      numberRequests: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      timestamp: [''],
    });
    this.form.controls['operation'].setValue(this.editData?.operation || '');
    this.form.controls['backend'].setValue(this.editData?.backend || '');
    this.form.controls['numberRequests'].setValue(this.editData?.numberRequests || '');
    this.form.controls['timestamp'].setValue(this.editData?.timestamp || '');
    this.form.controls['timestamp'].disable();
  }

  getError(field: string, aliasError: string) {
    const getError =
      this.form.get(field)?.hasError(aliasError) &&
      this.form.get(field)?.touched;
    return !!getError;
  }

  isInvalid(field: string): boolean {
    const hasError =
      this.form.get(field)?.invalid && this.form.get(field)?.touched;
    return !!hasError;
  }

  isSelected(item: any, field: string): boolean {
    const founded = item.name === this.form.get(field)?.value;
    return founded;
  }

  private resetForm() {
    this.form.reset();
    this.form.markAsPristine();
    this.form.markAsUntouched()
  }

  getValueOperationAlert(operation: string) {
    let operationAlert = "";
    switch (operation) {
      case "WC":
        operationAlert = "warningcutoff";
        break;
      case "WE":
        operationAlert = "warningerror";
        break;
      case "C":
        operationAlert = "cutoff";
        break;
      default:
        operationAlert = "recover";
        break;
    }
    return operationAlert;
  };

  save() {
    this.classAlert = '';
    this.mensajeError = '';
    this.showAlertError = false;
    if (!this.form.valid) {
      this.form.controls['backend'].markAsTouched();
      this.form.controls['numberRequests'].markAsTouched();
      this.classAlert = 'alert-danger';
      this.mensajeError = 'Por favor diligenciar el formulario correctamente';
      this.showAlertError = true;
      setTimeout(() => {
        this.showAlertError = false;
      }, 4000);
    } else {
      this.showAlertError = false;
      const objValues = this.form.value;
      delete objValues.timestamp;
      this.dialogRef.close({
        values: objValues,
        save: true,
        operationAlert: this.getValueOperationAlert(this.form.get('operation')?.value)
      });
    }
  }

  closeAlert() {
    this.showAlertError = false;
  }

  close() {
    this.showAlertError = false;
    this.dialogRef.close({
      values: this.form.value,
      save: false
    });
  }

}

