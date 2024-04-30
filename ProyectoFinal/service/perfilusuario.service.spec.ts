import { TestBed } from '@angular/core/testing';

import { PerfilusuarioService } from './perfilusuario.service';

describe('PerfilusuarioService', () => {
  let service: PerfilusuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerfilusuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
