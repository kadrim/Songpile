import { TestBed } from '@angular/core/testing';

import { YTDLService } from './ytdl.service';
import { FFmpegService } from './ffmpeg.service';

describe('FFmpegService', () => {
  let ffmpegService: FFmpegService;

  let originalTimeout;

  beforeEach(function() {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
    ffmpegService = FFmpegService.getInstance(true);
  });

  afterEach(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  it('should be created', () => {
    expect(ffmpegService).toBeTruthy();
  });

  it('should convert a video-download to mp3', async () => {
    const ytdlService: YTDLService = TestBed.get(YTDLService);
    const videoData = await ytdlService.getVideoBufferWithAudio('https://www.youtube.com/watch?v=EngW7tLk6R8');
    const audioBuffer = await ffmpegService.convertToMp3Buffer(videoData);
    expect(audioBuffer.byteLength).toBeGreaterThan(100 * 1024);
  });
});

