import { TestBed } from '@angular/core/testing';

import { TokenCognitoService } from './token-cognito.service';

describe('TokenCognitoService', () => {
  let service: TokenCognitoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenCognitoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
