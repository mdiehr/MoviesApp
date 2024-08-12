import { Component, Input } from '@angular/core';
import { MovieItem } from '../services/models';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.less'
})
export class MoviesComponent {
  @Input() movies: readonly MovieItem[] | null = [];
}
