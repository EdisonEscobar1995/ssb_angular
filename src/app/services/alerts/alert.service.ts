import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Alert } from 'src/app/entities/alert';
import { AlertMapper } from 'src/app/mappers/AlertMapper';
import { environment } from 'src/environments/environment';
import { AuthService } from '../security/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private readonly httpClient: HttpClient,
    private readonly authService: AuthService,
  ) { }

  getAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type':  'application/json;odata=verbose',
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
  }

  async getAlerts () {
    const url = `${environment.urlBaseSantillana}/v0.1/agent/alerts`;
    const request = this.httpClient.get(url, { headers: this.getAuthorizationHeader() });
    const data: any = await lastValueFrom(request);
    const alerts: Alert[] = AlertMapper.mapperAlerts(data);
    return alerts;
  }

  async saveAlert(data: Alert, operationAlert: string) {
    const url = `${environment.urlBaseSantillana}/v0.1/agent/${operationAlert}`;
    const request = this.httpClient.post(url, data, { headers: this.getAuthorizationHeader() });
    const dataResponse: any = await lastValueFrom(request);
    return dataResponse;
  }

}
