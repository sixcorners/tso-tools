import { TestBed } from '@angular/core/testing';

import { ChartNavigatorService } from './chart-navigator.service';

describe('ChartNavigatorService', () => {
  let service: ChartNavigatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChartNavigatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
