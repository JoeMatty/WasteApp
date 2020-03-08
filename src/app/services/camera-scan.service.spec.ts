import { TestBed } from '@angular/core/testing';

import { CameraScanService } from './camera-scan.service';

describe('CameraScanService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CameraScanService = TestBed.get(CameraScanService);
    expect(service).toBeTruthy();
  });
});
