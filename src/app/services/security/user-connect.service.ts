import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { UserInfo, UserRol } from 'src/app/entities/userConnect';
import { UserInfoMapper } from 'src/app/mappers/UserInfoMapper';
import configData from '../../../../config.json';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserConnectService {

  constructor(
    private readonly httpClient: HttpClient,
    private readonly authService: AuthService,
    private readonly userInfoMapper: UserInfoMapper
  ) { }

  getAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
  }

  async getUserRoles(userKey: string) {
    const url = `https://dev.santillanar4.com/v0.1/monitoring/userrole?userKey=${userKey}`;
    const request = this.httpClient.get(url, { headers: this.getAuthorizationHeader() });
    const data: any = await lastValueFrom(request);
    const userRoles: UserRol[] = UserInfoMapper.mapperUserRoles(data);
    return userRoles;
  };

  async getUserInfo() {
    const request = this.httpClient.get(configData.connect.infoUserEndpoint, { headers: this.getAuthorizationHeader() });
    const data: any = await lastValueFrom(request);
    const userInfo: UserInfo | null = UserInfoMapper.mapperInfo(data);
    if (userInfo) {
      const dataRoles = await this.getUserRoles(userInfo.userName);
      userInfo.roles = dataRoles || [];
    }
    return userInfo;
  };

}
