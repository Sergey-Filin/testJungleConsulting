import { TestBed } from '@angular/core/testing';

import { UserReposService } from './user-repos.service';

describe('UserReposService', () => {
  let service: UserReposService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserReposService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
