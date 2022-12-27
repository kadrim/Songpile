import * as fs from 'fs';
import * as path from 'path';
import { YTDLService } from './ytdl.service';
import { FFmpegService } from './ffmpeg.service';

describe('FFmpegService', async () => {
  const ytdlService = new YTDLService();
  let ffmpegService;

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
    const outputVideoFile = path.resolve('./', 'test-conversion.mp4');
    const outputAudioFile = path.resolve('./', 'test-conversion.mp3');
    await ytdlService.downloadWithAudio('https://www.youtube.com/watch?v=EngW7tLk6R8', outputVideoFile);
    const videoData = fs.readFileSync(outputVideoFile);
    await ffmpegService.convertToMp3(videoData, outputAudioFile);

    const fileStats = fs.statSync(outputAudioFile);
    fs.unlinkSync(outputVideoFile);
    fs.unlinkSync(outputAudioFile);

    expect(fileStats.size).toBeGreaterThan(100 * 1024);
  });
});
