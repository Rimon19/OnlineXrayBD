import { TestBed } from '@angular/core/testing';

import { DoctorAuthGuardService } from './doctor-auth-guard.service';

describe('DoctorAuthGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DoctorAuthGuardService = TestBed.get(DoctorAuthGuardService);
    expect(service).toBeTruthy();
  });
});
