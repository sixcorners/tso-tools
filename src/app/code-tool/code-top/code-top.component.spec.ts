import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeTopComponent } from './code-top.component';
import { provideRouter } from '@angular/router';

describe('CodeTopComponent', () => {
  let component: CodeTopComponent;
  let fixture: ComponentFixture<CodeTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodeTopComponent],
      providers: [provideRouter([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodeTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
