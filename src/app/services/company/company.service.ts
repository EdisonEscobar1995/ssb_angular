import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Company } from 'src/app/entities/company';
import { CompanyMapper } from 'src/app/mappers/CompanyMapper';
import { environment } from 'src/environments/environment';
import { AuthService } from '../security/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

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

  async getCompanies () {
    const url = `${environment.urlBaseSantillana}/sif/v3/empresas`;
    const request = this.httpClient.get(url, { headers: this.getAuthorizationHeader() });
    const data: any = await lastValueFrom(request);
    const companies: Company[] = CompanyMapper.mapperCompanies(data.empresaList);
    return companies;
  }

}
