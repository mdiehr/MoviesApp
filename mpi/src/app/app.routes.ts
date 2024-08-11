import { Routes } from '@angular/router';
import { HomeviewComponent } from './homeview/homeview.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';

export const routes: Routes = [
  {path: '', component: HomeviewComponent, title: "Search - Moving Picture Interface"},
  {path: 'movie/:id', component: MovieDetailsComponent},
];
