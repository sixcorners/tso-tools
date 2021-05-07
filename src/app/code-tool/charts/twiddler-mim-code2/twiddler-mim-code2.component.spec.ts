import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwiddlerMimCode2Component } from './twiddler-mim-code2.component';

describe('TwiddlerMimCode2Component', () => {
  let component: TwiddlerMimCode2Component;
  let fixture: ComponentFixture<TwiddlerMimCode2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwiddlerMimCode2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TwiddlerMimCode2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
