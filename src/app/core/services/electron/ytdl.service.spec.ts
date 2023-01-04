import { TestBed } from '@angular/core/testing';

import { YTDLService } from './ytdl.service';

describe('YTDLService', () => {
  let originalTimeout;

  beforeEach(function() {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
    TestBed.configureTestingModule({});
  });

  afterEach(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  it('should be created', () => {
    const service: YTDLService = TestBed.inject(YTDLService);
    expect(service).toBeTruthy();
  });

  it('should download a video-stream', async () => {
    const service: YTDLService = TestBed.inject(YTDLService);
    const videoData = await service.getVideoBufferWithAudio('https://www.youtube.com/watch?v=EngW7tLk6R8');
    expect(videoData.byteLength).toBeGreaterThan(800 * 1024);
  });


});
