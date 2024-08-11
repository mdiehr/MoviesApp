import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MovieService } from '../services/movies.api';
import { Store } from '@ngrx/store';
import { MovieActions } from '../state/movies.state';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.less'
})
export class SearchbarComponent {

  private store: Store =  inject(Store);
  private movieService: MovieService = inject(MovieService);

  private router: Router = inject(Router);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  searchForm = new FormGroup({
    title: new FormControl(''),
    genre: new FormControl(''),
  });

  private PER_PAGE: number = 5;
  private currentPage: number = 1;
  private currentSearch: string = ''; 

  constructor() {
    this.activatedRoute.queryParamMap.subscribe(map => {
      console.info('Route change:');
      console.info(map);
      this.currentPage = Number.parseInt(map.get('page') || '1');
      this.currentSearch = map.get('search') || '';
      this.search(this.currentSearch, this.searchForm.value.genre || undefined)
    });
  }

  handleSubmit($event: any) {
    $event.preventDefault();
    console.info(this.searchForm.value);
    // Submitting the form should reset the page & set the search parameter
    const queryParams: Params = {
      search: this.searchForm.value.title || undefined,
      page: 1,
    }
    this.router.navigate([], {
      queryParams,
      queryParamsHandling: 'merge',
      relativeTo: this.activatedRoute,
    });
    this.search(this.searchForm.value.title || undefined, this.searchForm.value.genre || undefined);
  }

  search(title?: string, genre?: string) {
    const page = this.currentPage || 1;
    // Only search if a title is present to search for
    if (title && title !== '') {
      // Go to the movies
      this.store.dispatch(MovieActions.fetchingMovies());
      this.movieService.getMovies(page, this.PER_PAGE, title, genre).subscribe(movies => {
          this.store.dispatch(MovieActions.retrievedMovies({movies, page}))
        });
    }
  }
}
