import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeSideComponent } from './code-side.component';

describe('CodeSideComponent', () => {
  let component: CodeSideComponent;
  let fixture: ComponentFixture<CodeSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodeSideComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodeSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
