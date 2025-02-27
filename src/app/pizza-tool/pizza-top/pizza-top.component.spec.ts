import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaTopComponent } from './pizza-top.component';
import { provideRouter } from '@angular/router';

describe('PizzaTopComponent', () => {
  let component: PizzaTopComponent;
  let fixture: ComponentFixture<PizzaTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PizzaTopComponent],
      providers: [provideRouter([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(PizzaTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
