import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthState } from '../state/auth.state';
import { selectAuthFeature } from '../state/selectors';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-connection-status',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './connection-status.component.html',
  styleUrl: './connection-status.component.less'
})
export class ConnectionStatusComponent {

  private store: Store = inject(Store);
  authStatus$: Observable<AuthState> = this.store.select(selectAuthFeature);
  
}
