import { TestBed } from '@angular/core/testing';

import { JnwService } from './jnw.service';

describe('JnwService', () => {
  let service: JnwService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JnwService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
