import { TestBed } from '@angular/core/testing';

import { PizzaModelService } from './pizza-model.service';

describe('PizzaModelService', () => {
  let service: PizzaModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PizzaModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
