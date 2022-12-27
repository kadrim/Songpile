import { Readable } from 'stream';
import ytdl from 'ytdl-core';

export class YTDLService {
  constructor() { }

  public async getStreamWithAudio(videoURL: string): Promise<Readable> {
    const video = ytdl(videoURL, {
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
