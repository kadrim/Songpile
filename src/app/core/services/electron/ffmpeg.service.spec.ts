import { FFmpegService } from './ffmpeg.service';
import * as path from 'path';
import * as fs from 'fs';

describe('FFmpegService', () => {
  let ffmpegService: FFmpegService;

  let originalTimeout;

  beforeEach(function() {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
    ffmpegService = FFmpegService.getInstance(true);
  });

  afterEach(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  it('should be created', () => {
    expect(ffmpegService).toBeTruthy();
  });

  it('should convert a mp4-video to mp3', async () => {
    const videoData = fs.readFileSync(path.resolve('./src/assets/dummy.mp4'));
    const audioBuffer = await ffmpegService.convertToMp3Buffer(videoData);
    expect(audioBuffer.byteLength).toBeGreaterThan(100 * 1024);
  });
});

