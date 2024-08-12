import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { AuthResolverService } from './services/auth-resolver.service';
import { MovieTitleResolver } from './services/movie-title-resolver.service';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';

export const routes: Routes = [
  { path: '', component: HomeComponent,
    title: "Moving Picture Interface - Search",
    resolve: { isLoggedIn: AuthResolverService }
  },
  { path: 'movie/:id', component: MovieDetailsComponent,
    title: MovieTitleResolver,
    resolve: { isLoggedIn: AuthResolverService }
  },
  { path: '**', component: NotFoundPageComponent}
];
