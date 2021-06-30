import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaSideComponent } from './pizza-side.component';

describe('PizzaSideComponent', () => {
  let component: PizzaSideComponent;
  let fixture: ComponentFixture<PizzaSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PizzaSideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PizzaSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
