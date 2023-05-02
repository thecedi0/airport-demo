import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadPaginationComponent } from './load-pagination.component';

describe('LoadPaginationComponent', () => {
  let component: LoadPaginationComponent;
  let fixture: ComponentFixture<LoadPaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoadPaginationComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
