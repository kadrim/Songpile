import { TestBed } from '@angular/core/testing';

import { YTDLService } from './ytdl.service';

describe('YTDLService', () => {
  let service: YTDLService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YTDLService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(service).toBeFalsy();
  });
});
