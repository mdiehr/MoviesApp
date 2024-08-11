import { Component, inject } from '@angular/core';
import { SearchbarComponent } from '../searchbar/searchbar.component';
import { MovielistComponent } from '../movielist/movielist.component';
import { MovieItem } from '../services/models';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectMovies, selectMoviesFeature } from '../state/selectors';
import { AsyncPipe } from '@angular/common';
import { MovieState } from '../state/movies.state';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-homeview',
  standalone: true,
  imports: [SearchbarComponent, MovielistComponent, AsyncPipe, RouterLink],
  templateUrl: './homeview.component.html',
  styleUrl: './homeview.component.less'
})
export class HomeviewComponent {

  private store: Store = inject(Store);
  public movies$: Observable<readonly MovieItem[]> = this.store.select(selectMovies);
  public moviesFeature$: Observable<MovieState> = this.store.select(selectMoviesFeature);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  public page: number = 1;
  public search?: string;

  constructor() {
    this.activatedRoute.queryParamMap.subscribe(map => {
      this.page = Number.parseInt(map.get('page') || '1');
      this.search = map.get('search') || '';
    });
  }

}
