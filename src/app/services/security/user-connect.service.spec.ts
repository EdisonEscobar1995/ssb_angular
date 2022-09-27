import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import configData from '../../../../config.json';

import { UserConnectService } from './user-connect.service';

describe('UserConnectService', () => {
  let service: UserConnectService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
    });
    service = TestBed.inject(UserConnectService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be return roles info ', async () => {

    const expectedResponse = [{
      key: "testvisualizadorssb",
      name: "Test Visualizador SSB",
      role: "visualizer"
    }];

    const responseRoles = [{
      key: "testvisualizadorssb",
      name: "Test Visualizador SSB",
      role: "visualizer"
    }];

    const roleService = service.getUserRoles('testvisualizadorssb');

    const req = httpMock.expectOne(`${environment.urlBaseSantillana}/v0.1/monitoring/userrole?userKey=testvisualizadorssb`);
    req.flush(responseRoles);

    expect(await roleService).toEqual(expectedResponse);
  });

  it('should be return user info logged', async () => {
    const expectedResponse = {
      sub: "636409",
      userName: "testvisualizadorssb",
      email: "testvisualizadorssb@example.com",
      emailVerified: true
    };

    const responseObject = {
      sub: "636409",
      preferred_username: "testvisualizadorssb",
      email: "testvisualizadorssb@example.com",
      email_verified: true
    };

    const userInfo = service.getUserInfo();
    const req = httpMock.expectOne(configData.connect.infoUserEndpoint);
    req.flush(responseObject);

    expect(await userInfo).toEqual(expectedResponse);

  });

  it('should be return not user info logged', async () => {
    const expectedResponse = {
      sub: "636409",
      userName: "testvisualizadorssb",
      email: "testvisualizadorssb@example.com",
      emailVerified: true
    };

    const responseObject = null;

    const userInfo = service.getUserInfo();
    const req = httpMock.expectOne(configData.connect.infoUserEndpoint);
    req.flush(responseObject);

    expect(await userInfo).toEqual(expectedResponse);

  });

});
