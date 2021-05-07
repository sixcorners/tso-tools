import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CbuchartComponent } from './cbuchart.component';

describe('CbuchartComponent', () => {
  let component: CbuchartComponent;
  let fixture: ComponentFixture<CbuchartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CbuchartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CbuchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
