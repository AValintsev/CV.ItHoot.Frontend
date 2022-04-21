import { TestBed } from '@angular/core/testing';

import { CVService } from './cv.service';

describe('UserCVService', () => {
  let service: CVService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CVService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
