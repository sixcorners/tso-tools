import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeTopComponent } from './code-top.component';

describe('CodeTopComponent', () => {
  let component: CodeTopComponent;
  let fixture: ComponentFixture<CodeTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodeTopComponent]
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
