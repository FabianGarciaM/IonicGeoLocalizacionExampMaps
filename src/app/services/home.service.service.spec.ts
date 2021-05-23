import { TestBed } from '@angular/core/testing';

import { HomeServiceService } from './home.service.service';

describe('Home.ServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HomeServiceService = TestBed.get(HomeServiceService);
    expect(service).toBeTruthy();
  });
});
