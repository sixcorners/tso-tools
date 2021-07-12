import { TestBed } from '@angular/core/testing';

import { TwiddlerMimCode2Service } from './twiddler-mim-code2.service';

describe('TwiddlerMimCode2Service', () => {
  let service: TwiddlerMimCode2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TwiddlerMimCode2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
