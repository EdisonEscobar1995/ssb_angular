import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Company } from 'src/app/entities/company';

@Component({
  selector: 'app-form-company',
  templateUrl: './form-company.component.html',
  styleUrls: ['./form-company.component.scss']
})
export class FormCompanyComponent implements OnInit {
  form!: FormGroup;
  titleModal = '';
  editData: Company | null = null;

  constructor(
    private readonly formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<FormCompanyComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.titleModal = data.titleModal;
    this.editData = data.dataEdit || null;
  }

  ngOnInit(): void {
    this.setValuesFieldsForm();
  }

  private setValuesFieldsForm() {
    this.form && this.resetForm();
    this.form = this.formBuilder.group({
      id: ['', [Validators.required]],
      description: ['', [Validators.required]],
      idCountry: ['', [Validators.required]],
      empresaCode: [''],
      order: [''],
    });
    this.form.controls['id'].setValue(this.editData?.id || '');
    this.form.controls['description'].setValue(this.editData?.description || '');
    this.form.controls['idCountry'].setValue(this.editData?.idCountry || '');
    this.form.controls['empresaCode'].setValue(this.editData?.empresaCode || '');
    this.form.controls['order'].setValue(this.editData?.order || '');
    ['id', 'description', 'idCountry', 'empresaCode', 'order'].forEach((item) => {
      this.form.controls[item].disable();
    });
  }

  private resetForm() {
    this.form.reset();
    this.form.markAsPristine();
    this.form.markAsUntouched()
  }

  close() {
    this.dialogRef.close({
      values: {},
      save: false
    });
  }

  save() {

  }

}
