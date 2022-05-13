import { TestBed } from '@angular/core/testing';

import { APICedulasService } from './api-cedulas.service';

describe('APICedulasService', () => {
  let service: APICedulasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(APICedulasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
