import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeToolComponent } from './code-tool.component';

describe('CodeToolComponent', () => {
  let component: CodeToolComponent;
  let fixture: ComponentFixture<CodeToolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodeToolComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodeToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
