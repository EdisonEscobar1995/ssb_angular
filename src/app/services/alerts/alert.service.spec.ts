import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';

import { AlertService } from './alert.service';

describe('AlertService', () => {
  let service: AlertService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
    });
    service = TestBed.inject(AlertService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be return alerts info', async () => {

    const expectedResponse = {
      backend: 'C',
      numberRequests: '10',
      operation: 'BDC',
      timestamp: '2022-11-30T10:45',
    };

    const responseRoles = [{
      backend: 'W',
      numberRequests: '2',
      operation: 'LMS',
      timestamp: '2022-10-30T10:45',
    }, {
      backend: 'C',
      numberRequests: '10',
      operation: 'BDC',
      timestamp: '2022-11-30T10:45',
    }, {
      backend: 'R',
      numberRequests: '21',
      operation: 'SSB',
      timestamp: '2022-09-30T10:45',
    }];

    const reqAlerts = service.getAlerts();

    const req = httpMock.expectOne(`${environment.urlBaseSantillana}/v0.1/agent/alerts`);
    req.flush(responseRoles);

    expect(await reqAlerts).toContain(expectedResponse);
  });

  it('should be return 200 save alert', async () => {
    const responseObject = {
      code: "200",
      message: "La alerta se guardo exitosamente"
    };

    const data = {
      backend: 'C',
      numberRequests: '10',
      operation: 'BDC'
    };

    const saveAlert = service.saveAlert(data, 'cutoff');
    const req = httpMock.expectOne(`${environment.urlBaseSantillana}/v0.1/agent/cutoff`);
    req.flush(responseObject);
    const response = await saveAlert;

    expect(response.code).toEqual("200");

  });

});
