import { YTDLService } from './ytdl.service';

describe('YTDLService', () => {
  const service: YTDLService = new YTDLService();
  let originalTimeout;

  beforeEach(function() {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
  });

  afterEach(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should download a video-stream', async () => {
    const videoStream = await service.getStreamWithAudio('https://www.youtube.com/watch?v=EngW7tLk6R8');
    const chunks = [];
    for await (const chunk of videoStream) {
      chunks.push(chunk);
    }
    const videoData = Buffer.concat(chunks);

    expect(videoData.byteLength).toBeGreaterThan(800 * 1024);
  });


});
