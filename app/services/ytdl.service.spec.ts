import * as fs from 'fs';
import * as path from 'path';
import { YTDLService } from './ytdl.service';

describe('YTDLService', () => {
  const service = new YTDLService();
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

  it('should download a file', async () => {
    const outputFile = path.resolve('./', 'test.mp4');
    await service.downloadWithAudio('https://www.youtube.com/watch?v=aqz-KE-bpKQ', outputFile);
    const fileStats = fs.statSync(outputFile);
    fs.unlinkSync(outputFile);

    expect(fileStats.size).toBeGreaterThan(100 * 1024 * 1024);
  });


});
