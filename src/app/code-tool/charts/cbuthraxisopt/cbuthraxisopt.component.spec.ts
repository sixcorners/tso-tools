import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CbuthraxisoptComponent } from './cbuthraxisopt.component';

describe('CbuthraxisoptComponent', () => {
  let component: CbuthraxisoptComponent;
  let fixture: ComponentFixture<CbuthraxisoptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CbuthraxisoptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CbuthraxisoptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
