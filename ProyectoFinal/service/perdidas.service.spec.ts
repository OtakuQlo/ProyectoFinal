import { TestBed } from '@angular/core/testing';

import { PerdidasService } from './perdidas.service';

describe('PerdidasService', () => {
  let service: PerdidasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerdidasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
