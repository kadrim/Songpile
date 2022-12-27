import * as fs from 'fs';
import * as path from 'path';
import { createFFmpeg } from '@ffmpeg/ffmpeg';
import PQueue from 'p-queue';

export class FFmpegService {
  private static instance: FFmpegService;

  private ffmpegInstance;
  private ffmpegLoadingPromise;

  private requestQueue = new PQueue({ concurrency: 1 });

  private constructor(karmaTest: boolean) {
    if(karmaTest) { // during a karma test the wasm has to be fetched from an URL
      this.ffmpegInstance = createFFmpeg({
        log: true,
        mainName: 'main',
        corePath: 'http://localhost:9876/ffmpeg/ffmpeg-core.js'
      });
    } else { // in electron/nodejs mode the wasm can be loaded directly
      this.ffmpegInstance = createFFmpeg({
        log: true
      });
    }
    this.ffmpegLoadingPromise = this.ffmpegInstance.load();
  }

  public static getInstance(karmaTest: boolean = false): FFmpegService {
    if (!FFmpegService.instance) {
      FFmpegService.instance = new FFmpegService(karmaTest);
    }

    return FFmpegService.instance;
  }

  public async convertToMp3(videoData, outputFileName) {
    try {
      const ffmpeg = await this.getFFmpeg();

      const inputFileName = `input-video`;
      let outputData = null;

      await this.requestQueue.add(async () => {
        ffmpeg.FS('writeFile', inputFileName, videoData);

        await ffmpeg.run(
          '-i', inputFileName,
          '-b:a', '192K',
          '-metadata', 'title=Track Title', '-metadata', 'artist=Artist', '-metadata', 'album=Album Name',
          '-vn',
          path.basename(outputFileName)
        );

        outputData = ffmpeg.FS('readFile', path.basename(outputFileName));
        ffmpeg.FS('unlink', inputFileName);
        ffmpeg.FS('unlink', path.basename(outputFileName));
      });

      fs.writeFileSync(outputFileName, outputData);
    } catch (error) {
      console.error(error);
    }
  }

  public async getFFmpeg() {
    if (this.ffmpegLoadingPromise) {
      await this.ffmpegLoadingPromise;
      this.ffmpegLoadingPromise = undefined;
    }

    return this.ffmpegInstance;
  }
}
