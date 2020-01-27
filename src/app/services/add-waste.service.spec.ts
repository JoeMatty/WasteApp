import { TestBed } from '@angular/core/testing';

import { AddWasteService } from './add-waste.service';

describe('AddWasteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddWasteService = TestBed.get(AddWasteService);
    expect(service).toBeTruthy();
  });
});
