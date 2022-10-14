import { Injectable } from '@angular/core';
import configData from '../../../../config.json';

import { UserManager, UserManagerSettings, User } from 'oidc-client';
import { Observable, from, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private manager = new UserManager(getClientSettings());
  private user: User | null = null;
  private callbackIsLogin = new Subject<boolean>();

  constructor() {
    this.manager.getUser().then(user => {
      this.user = user;
      // debugger;
      this.isLoggedInSubject().next(this.isLoggedIn());
    });
  }

  isLoggedInSubject() {
    return this.callbackIsLogin;
  }

  isLoggedIn(): boolean {
    // debugger;
    return this.user != null && !this.user.expired;
  }

  isLoggedInObs(): Observable<boolean> {
    return from(this.manager.getUser().then(user => {
      if (user) {
        return true;
      }
      return false;
    }));
  }

  getClaims(): any {
    return this.user?.profile;
  }

  getAuthorizationHeaderValue(): string {
    return `${this.user?.token_type} ${this.user?.access_token}`;
  }

  getToken(): string | undefined{
    return this.user?.access_token;
  }

  startAuthentication(): Promise<void> {
    return this.manager.signinRedirect();
  }

  completeAuthentication(): Promise<void> {
    return this.manager.signinRedirectCallback().then(user => {
      this.user = user;
      this.isLoggedInSubject().next(this.isLoggedIn());
    });
  }

  startLogout(): Promise<any> {
    return this.manager.signoutRedirect();
  }
  completeLogout(url?: string): Promise<any> {
    return this.manager.signoutRedirectCallback(url).then(() => {
      // This will clear the OpenID access tokens that is stored in the session
      return this.manager.clearStaleState();
    });
  }

}

export function getClientSettings(): UserManagerSettings {
  return {
    authority: configData.connect.authority,
    client_id: configData.connect.client_id,
    redirect_uri: configData.connect.redirect_uri,
    post_logout_redirect_uri: configData.connect.post_logout_redirect_uri,
    response_type: configData.connect.response_type,
    scope: configData.connect.scope,
    filterProtocolClaims: configData.connect.filterProtocolClaims,
    loadUserInfo: configData.connect.loadUserInfo
  };
}
