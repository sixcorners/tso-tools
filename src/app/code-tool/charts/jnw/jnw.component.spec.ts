import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JnwComponent } from './jnw.component';

describe('JnwComponent', () => {
  let component: JnwComponent;
  let fixture: ComponentFixture<JnwComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JnwComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JnwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
