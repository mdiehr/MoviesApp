import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pagination-controls',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './pagination-controls.component.html',
  styleUrl: './pagination-controls.component.less'
})
export class PaginationControlsComponent {

  @Input() page = 1;
  @Input() pageMax = 1;
  @Input() search: string | undefined;
  @Input() genre: string | undefined;
}
