import { TestBed } from '@angular/core/testing';

import { UserConnectService } from './user-connect.service';

describe('UserConnectService', () => {
  let service: UserConnectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserConnectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
