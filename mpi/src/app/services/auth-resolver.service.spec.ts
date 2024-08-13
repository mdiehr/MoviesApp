import { TestBed } from '@angular/core/testing';

import { AuthResolverService } from './auth-resolver.service';
import { provideMockStore } from '@ngrx/store/testing';

describe('AuthResolverService', () => {
  let service: AuthResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({}),
      ]
    });
    service = TestBed.inject(AuthResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
