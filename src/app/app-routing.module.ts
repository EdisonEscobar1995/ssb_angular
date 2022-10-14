import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCompaniesComponent } from './components/company/list-companies/list-companies.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { ListAlertsComponent } from './components/alerts/list-alerts/list-alerts.component';
import { CognitoComponent } from './components/cognito/cognito/cognito.component';

const routes: Routes = [
  {
    path: '',
    children: []
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'companies',
    component: ListCompaniesComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'alerts',
    component: ListAlertsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'cognito',
    component: CognitoComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  // {
  //   path: 'call-api',
  //   component: CallApiComponent,
  //   canActivate: [AuthGuardService]
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
