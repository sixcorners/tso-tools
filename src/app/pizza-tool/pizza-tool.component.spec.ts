import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaToolComponent } from './pizza-tool.component';

describe('PizzaToolComponent', () => {
  let component: PizzaToolComponent;
  let fixture: ComponentFixture<PizzaToolComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PizzaToolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PizzaToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
