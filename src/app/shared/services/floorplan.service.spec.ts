import { TestBed } from '@angular/core/testing';

import { FloorplanService } from './floorplan.service';

describe('FloorplanService', () => {
  let service: FloorplanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FloorplanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
