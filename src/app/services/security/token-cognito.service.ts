import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import configData from '../../../../config.json';

@Injectable({
  providedIn: 'root'
})
export class TokenCognitoService {

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  getAuthorizationHeader(): HttpHeaders {
    const authData = window.btoa(`${configData.cognito.clientId}:${configData.cognito.clientSecret}`);
    return new HttpHeaders({
      'Content-Type':  'application/x-www-form-urlencoded',
      'Authorization': `Basic ${authData}`
    });
  }

  async getTokenCognito() {
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    const url = configData.cognito.tokenEndpoint;
    const request = this.httpClient.post(url, params, {
      headers: this.getAuthorizationHeader(),
    });
    const data: any = await lastValueFrom(request);
    return data;
  };
}
