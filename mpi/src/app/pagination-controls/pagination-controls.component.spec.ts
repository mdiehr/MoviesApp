import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationControlsComponent } from './pagination-controls.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('PaginationControlsComponent', () => {
  let component: PaginationControlsComponent;
  let fixture: ComponentFixture<PaginationControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationControlsComponent],
      providers: [
        { provide: ActivatedRoute,  
          useValue: 
          {
            queryParamMap: of({page: 1})
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginationControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
