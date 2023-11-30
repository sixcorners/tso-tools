import { TestBed } from '@angular/core/testing';

import { Tso0112Service } from './tso0112.service';

describe('Tso0112Service', () => {
  let service: Tso0112Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Tso0112Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
