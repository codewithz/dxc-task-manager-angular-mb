import { TestBed } from '@angular/core/testing';

import { ProjectsRepositoryService } from './projects-repository.service';

describe('ProjectsRepositoryService', () => {
  let service: ProjectsRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectsRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
