import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MovieService } from '../services/movies.api';
import { Store } from '@ngrx/store';
import { MovieActions } from '../state/movies.state';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { selectGenreTitles } from '../state/selectors';
import { AsyncPipe } from '@angular/common';
import { RESULTS_PER_PAGE } from '../constants/config';

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.less'
})
export class SearchbarComponent implements OnInit {

  private store: Store =  inject(Store);
  private movieService: MovieService = inject(MovieService);

  private router: Router = inject(Router);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  genres$ = this.store.select(selectGenreTitles);

  searchForm = new FormGroup({
    title: new FormControl(''),
    genre: new FormControl(''),
  });

  private currentPage = 1;
  private currentGenre: string | null = null;

  constructor() {
    this.activatedRoute.queryParamMap.subscribe(map => {
      this.currentPage = Number.parseInt(map.get('page') || '1');
      const search = map.get('search') || '';
      this.currentGenre = map.get('genre') || '';
      // console.info('Route change:', this.currentPage, search, this.currentGenre);
      this.searchForm.patchValue({
        'title': search,
        'genre': this.currentGenre,
      })
      this.searchMovie(search, this.currentGenre)
    });
  }

  ngOnInit() {
    // Update genre filter when the dropdown is changed
    this.searchForm.controls.genre.valueChanges.subscribe(genre => {
      if (this.currentGenre !== genre) {
        this.currentGenre = genre;
        // When the genre changes, switch back to page 1
        this.patchQueryParams(this.searchForm.value.title, genre, 1);
      }
    })
  }

  handleSubmit($event?: Event) {
    if ($event) {
      // The page will try to POST otherwise
      $event.preventDefault();
    }
    // Submitting the form should reset the page & set the search parameter
    this.patchQueryParams(this.searchForm.value.title, this.searchForm.value.genre, 1);
    this.searchMovie(this.searchForm.value.title, this.searchForm.value.genre);
  }

  searchMovie(title?: string | null, genre?: string | null) {
    const page = this.currentPage || 1;
    // Only search if a title is present to search for
    if (title && title !== '') {
      // Go to the movies
      this.store.dispatch(MovieActions.fetchingMovies());
      this.movieService.getMovies(page, RESULTS_PER_PAGE, title, genre || undefined).subscribe(movies => {
          this.store.dispatch(MovieActions.retrievedMovies({movies, page}))
        });
    }
  }

  patchQueryParams(title?: string | null, genre?: string | null, page?: number) {
    const queryParams: Params = {
      search: title || undefined,
      genre: genre || undefined,
      page: page,
    }
    this.router.navigate([], {
      queryParams,
      queryParamsHandling: 'merge',
      relativeTo: this.activatedRoute,
    });
  }
}
