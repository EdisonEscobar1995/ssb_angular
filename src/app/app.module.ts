import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { ListCompaniesComponent } from './components/company/list-companies/list-companies.component';
import { HttpClientModule } from '@angular/common/http';
import { UserInfoMapper } from './mappers/UserInfoMapper';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { userReducer } from './store/security/user.reducer';
import { UserEffects } from './store/security/user.effects';
import { ListAlertsComponent } from './components/alerts/list-alerts/list-alerts.component';
import { FormAlertComponent } from './components/alerts/form-alert/form-alert.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormFieldComponent } from './components/shared/controls/form-field/form-field.component';
import { FormFieldErrorComponent } from './components/shared/controls/form-field-error/form-field-error.component';
import { FormSelectComponent } from './components/shared/controls/form-select/form-select.component';
import { FormFieldNumberComponent } from './components/shared/controls/form-field/form-field-number.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ListCompaniesComponent,
    ListAlertsComponent,
    FormAlertComponent,
    FormFieldComponent,
    FormFieldErrorComponent,
    FormSelectComponent,
    FormFieldNumberComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    StoreModule.forFeature('userConnect', userReducer),
    EffectsModule.forFeature([UserEffects]),
    BrowserAnimationsModule
  ],
  providers: [
    UserInfoMapper
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
