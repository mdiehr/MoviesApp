import { Routes } from '@angular/router';
import { HomeviewComponent } from './homeview/homeview.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { AuthResolverService } from './services/auth-resolver.service';

export const routes: Routes = [
  {path: '', component: HomeviewComponent, title: "Search - Moving Picture Interface",
    resolve: {
      isLoggedIn: AuthResolverService
    }
  },
  {path: 'movie/:id', component: MovieDetailsComponent, title: "Movie - Moving Picture Interface",
    resolve: {
      isLoggedIn: AuthResolverService
    }
  },
];
