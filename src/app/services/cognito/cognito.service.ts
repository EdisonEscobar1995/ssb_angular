import jwt_decode from 'jwt-decode';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { isValidToken } from 'src/app/utils/common';
import { TokenCognitoService } from '../security/token-cognito.service';
import { environment } from 'src/environments/environment';
import { lastValueFrom } from 'rxjs';
import { CognitoMapper } from 'src/app/mappers/CognitoMapper';
import { Cognito } from 'src/app/entities/cognito';

@Injectable({
  providedIn: 'root'
})
export class CognitoService {

  constructor(
    private readonly httpClient: HttpClient,
    private readonly tokenCognitoService: TokenCognitoService
  ) { }

  async getTestCognito(scope: string, tokenCognito: string) {
    const tokenValidCognito = await this.verifyTokenCognito(tokenCognito);
    try {
      const url = `${environment.urlBaseCognito}/oauth2/test?scope=${scope}`;
      const request = this.httpClient.get(url, {
        headers: {
          Authorization: `Bearer ${tokenValidCognito}`,
          Accept: "application/json;odata=verbose"
        }
      });
      const data: any = await lastValueFrom(request);
      const cognitoData: Cognito | null = CognitoMapper.mapperInfoCognito(data);
      return cognitoData;
      // const { data } = await axios.get(url, {
      //   headers: {
      //     Authorization: `Bearer ${tokenValidCognito}`,
      //     Accept: "application/json;odata=verbose"
      //   },
      // });
      // console.log('data == ', data);
      // const cognitoData: Cognito = CognitoMapper.mapperInfoCognito(data);
      // return cognitoData;
    } catch (error: any) {
      const cognitoData: Cognito | null = CognitoMapper.mapperInfoCognito(error?.error);
      return cognitoData;
    }
  }

  async getTokenCognito() {
    const tokenCognito = await this.tokenCognitoService.getTokenCognito();
    return tokenCognito?.access_token || '';
  };

  async verifyTokenCognito(token: string) {
    const decodeToken: any = jwt_decode(token);
    let tokenResponse = token;
    if (!isValidToken(decodeToken?.exp)) {
      tokenResponse = await this.getTokenCognito();
    }
    return tokenResponse;
  }
}
