import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { IMAGE_CONFIG, IMAGE_LOADER, ImageLoaderConfig } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { provideState, provideStore } from '@ngrx/store';
import { authReducer } from './state/auth.state';
import { genresReducer, moviesReducer } from './state/movies.state';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideStore(),
    provideState({ name: 'auth', reducer: authReducer }),
    provideState({ name: 'genres', reducer: genresReducer }),
    provideState({ name: 'movies', reducer: moviesReducer }),
    { provide: IMAGE_CONFIG,
      useValue: {
        disableImageSizeWarning: true,
        disableImageLazyLoadWarning: true,
        placeholderResolution: 40,
      }
    },
    {
      provide: IMAGE_LOADER,
      useValue: (config: ImageLoaderConfig) => {
        // https://stackoverflow.com/questions/73089650/what-are-the-parameters-for-aws-media-amazon-image-hosting
        const base = config.src.split('._V1_');
        return `${base[0]}._V1_QL80_UX${config.width}_CR1,0.jpg`;
      },
    },
  ]
};
