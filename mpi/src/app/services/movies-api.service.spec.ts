import { TestBed } from '@angular/core/testing';

import { MoviesApiService } from './movies-api.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('MoviesApiService', () => {
  let service: MoviesApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });
    service = TestBed.inject(MoviesApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
