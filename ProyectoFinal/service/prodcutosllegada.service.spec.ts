import { TestBed } from '@angular/core/testing';

import { ProdcutosllegadaService } from './prodcutosllegada.service';

describe('ProdcutosllegadaService', () => {
  let service: ProdcutosllegadaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdcutosllegadaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
