import { Injectable } from '@angular/core';
import { ElectronService } from './electron.service';
import { Readable } from 'stream';
import ytdl from '@distube/ytdl-core';

@Injectable({
  providedIn: 'root'
})
export class YTDLService {
  ytdl: typeof ytdl;

  constructor(
    private electronService: ElectronService
  ) {
    if (electronService.isElectron) {
      this.ytdl = window.require('@distube/ytdl-core');
    }
  }

  public async getStreamWithAudio(videoURL: string): Promise<Readable> {
    const video = this.ytdl(videoURL, {
      quality: 'highestaudio',
    });

    let starttime;
    video.once('response', () => {
      starttime = Date.now();
    });
    video.on('progress', (_chunkLength, downloaded, total) => {
      const percent = downloaded / total;
      const downloadedMinutes = (Date.now() - starttime) / 1000 / 60;
      const estimatedDownloadTime = (downloadedMinutes / percent) - downloadedMinutes;
    });
    video.on('end', () => {
      console.log('finshed downloading');
    });

    return video;
  }

  public async getVideoBufferWithAudio(videoURL: string): Promise<Buffer> {
    const videoStream = await this.getStreamWithAudio(videoURL);

    const chunks = [];
    for await (const chunk of videoStream) {
      chunks.push(chunk);
    }
    return Buffer.concat(chunks);
  }
}
