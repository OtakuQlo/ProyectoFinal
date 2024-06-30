import { TestBed } from '@angular/core/testing';

import { OldstocksService } from './oldstocks.service';

describe('OldstocksService', () => {
  let service: OldstocksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OldstocksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
