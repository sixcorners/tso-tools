import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CbuthraxisoptComponent } from './cbuthraxisopt.component';

describe('CbuthraxisoptComponent', () => {
  let component: CbuthraxisoptComponent;
  let fixture: ComponentFixture<CbuthraxisoptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CbuthraxisoptComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CbuthraxisoptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
