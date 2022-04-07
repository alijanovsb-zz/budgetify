import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoNotExistsComponent } from './do-not-exists.component';

describe('DoNotExistsComponent', () => {
  let component: DoNotExistsComponent;
  let fixture: ComponentFixture<DoNotExistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoNotExistsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoNotExistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
