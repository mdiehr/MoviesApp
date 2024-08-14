import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MovieTitleResolver } from './services/movie-title-resolver.service';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { ConnectionStatusComponent } from './connection-status/connection-status.component';
import { AuthGuardService } from './services/auth-guard.service';

export const routes: Routes = [
  // Empty route to log in everything
  { path: '',
    canActivate: [ AuthGuardService ],
    children: [
      { path: '', component: HomeComponent,
        title: "Moving Picture Interface - Search"
      },
      { path: 'movie/:id', component: MovieDetailsComponent,
        title: MovieTitleResolver
      },
    ]
  },
  // Error handling
  { path: 'error', component: ConnectionStatusComponent,
    title: "Moving Picture Interface - Error",
  },
  { path: '**', component: NotFoundPageComponent }
];
