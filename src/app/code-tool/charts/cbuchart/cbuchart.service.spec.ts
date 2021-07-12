import { TestBed } from '@angular/core/testing';

import { CbuchartService } from './cbuchart.service';

describe('CbuchartService', () => {
  let service: CbuchartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CbuchartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
