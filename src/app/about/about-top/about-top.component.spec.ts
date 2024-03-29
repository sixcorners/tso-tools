import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutTopComponent } from './about-top.component';

describe('AboutTopComponent', () => {
  let component: AboutTopComponent;
  let fixture: ComponentFixture<AboutTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutTopComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AboutTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
