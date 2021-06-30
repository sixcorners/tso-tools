import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutSideComponent } from './about-side.component';

describe('AboutSideComponent', () => {
  let component: AboutSideComponent;
  let fixture: ComponentFixture<AboutSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutSideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
