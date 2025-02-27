import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tso0112Component } from './tso0112.component';

describe('Tso0112Component', () => {
  let component: Tso0112Component;
  let fixture: ComponentFixture<Tso0112Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tso0112Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tso0112Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
