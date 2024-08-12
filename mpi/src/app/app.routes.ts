import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { AuthResolverService } from './services/auth-resolver.service';

export const routes: Routes = [
  {path: '', component: HomeComponent, title: "Search - Moving Picture Interface",
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
