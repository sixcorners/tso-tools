import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaToolComponent } from './pizza-tool.component';

describe('PizzaToolComponent', () => {
  let component: PizzaToolComponent;
  let fixture: ComponentFixture<PizzaToolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PizzaToolComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PizzaToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
