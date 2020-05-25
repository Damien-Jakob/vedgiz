import { TestBed } from '@angular/core/testing';

import { AuthenticationProvider } from './authentication-provider.service';

describe('AuthentificationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthenticationProvider = TestBed.get(AuthenticationProvider);
    expect(service).toBeTruthy();
  });
});
