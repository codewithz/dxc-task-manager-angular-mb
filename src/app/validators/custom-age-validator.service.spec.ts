import { TestBed } from '@angular/core/testing';

import { CustomAgeValidatorService } from './custom-age-validator.service';

describe('CustomAgeValidatorService', () => {
  let service: CustomAgeValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomAgeValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
