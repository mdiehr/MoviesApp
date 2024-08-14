import { TestBed } from '@angular/core/testing';

import { AuthGuardService } from './auth-guard.service';
import { provideMockStore } from '@ngrx/store/testing';

describe('AuthGuardService', () => {
  let service: AuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({}),
      ]
    });
    service = TestBed.inject(AuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
