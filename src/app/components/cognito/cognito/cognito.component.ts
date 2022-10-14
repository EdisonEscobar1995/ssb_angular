import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cognito } from 'src/app/entities/cognito';
import { CognitoService } from 'src/app/services/cognito/cognito.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-cognito',
  templateUrl: './cognito.component.html',
  styleUrls: ['./cognito.component.scss']
})
export class CognitoComponent implements OnInit {
  form!: FormGroup;
  dataSource: any[] = [];
  displayedColumns: string[] = ['scope', 'message', 'responseComplete'];

  constructor(
    private readonly serviceMenu: MenuService,
    private readonly formBuilder: FormBuilder,
    private readonly cognitoService: CognitoService,
  ) { }

  ngOnInit(): void {
    this.serviceMenu.getMenuActive().next('cognito');
    this.form = this.formBuilder.group({
      scope: ['', [Validators.required]],
    });
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

  save() {
    if (!this.form.valid) {
      this.form.controls['scope'].markAsTouched();
    } else {
      this.dataSource = [];
      const objValues = this.form.value;
      this.getTestCognito(objValues.scope);
    }
  }

  async getTestCognito(scope: string) {
    // setLoading(true);
    const tokenCognito = localStorage.getItem('token_cognito');
    if (tokenCognito) {
      const cognitoData: Cognito | null = await this.cognitoService.getTestCognito(scope, tokenCognito);
      this.dataSource = [{
        ...cognitoData,
        responseComplete: JSON.stringify(cognitoData)
      }];
    }
    // setLoading(false);
  };

}
