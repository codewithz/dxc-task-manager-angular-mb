import { TestBed } from '@angular/core/testing';

import { TeamSizeService } from './team-size.service';

describe('TeamSizeService', () => {
  let service: TeamSizeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamSizeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
