import { Routes } from '@angular/router';
import { HomeviewComponent } from './homeview/homeview.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MovieService } from './services/movies.api';

export const routes: Routes = [
  {path: '', component: HomeviewComponent, title: "Search - Moving Picture Interface"},
  {path: 'movie/:id', component: MovieDetailsComponent,
    resolve: {
      isLoggedIn: MovieService
    }
  },
];
