import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaTopComponent } from './pizza-top.component';

describe('PizzaTopComponent', () => {
  let component: PizzaTopComponent;
  let fixture: ComponentFixture<PizzaTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PizzaTopComponent]
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
