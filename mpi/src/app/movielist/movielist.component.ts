import { Component, Input } from '@angular/core';
import { MovieItem } from '../services/models';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-movielist',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage],
  templateUrl: './movielist.component.html',
  styleUrl: './movielist.component.less'
})
export class MovielistComponent {
  @Input() movies: readonly MovieItem[] | null = [];
}
