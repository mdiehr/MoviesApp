import { Component, Input } from '@angular/core';
import { MovieExtendedDetail, MovieItem } from '../services/models';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movie-small-card',
  standalone: true,
  imports: [NgOptimizedImage, RouterLink],
  templateUrl: './movie-small-card.component.html',
  styleUrl: './movie-small-card.component.less'
})
export class MovieSmallCardComponent {

  @Input() movie?: MovieItem;
  @Input() movieDetails?: MovieExtendedDetail;
}
