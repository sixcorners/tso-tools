import { TestBed } from '@angular/core/testing';

import { CbuthraxisoptService } from './cbuthraxisopt.service';

describe('CbuthraxisoptService', () => {
  let service: CbuthraxisoptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CbuthraxisoptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
