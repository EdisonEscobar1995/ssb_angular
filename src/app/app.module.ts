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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ListCompaniesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    StoreModule.forFeature('userConnect', userReducer),
    EffectsModule.forFeature([UserEffects])
  ],
  providers: [
    UserInfoMapper
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
