import * as fs from 'fs';
import ytdl from 'ytdl-core';

const { pipeline } = require('stream/promises');

export class YTDLService {
    constructor() { }

    public async downloadWithAudio(videoURL: string, outputFile: string) {
        const video = ytdl(videoURL, {
            quality: 'highestaudio',
        });

        let starttime;
        video.once('response', () => {
            starttime = Date.now();
        });
        video.on('progress', (chunkLength, downloaded, total) => {
            const percent = downloaded / total;
            const downloadedMinutes = (Date.now() - starttime) / 1000 / 60;
            const estimatedDownloadTime = (downloadedMinutes / percent) - downloadedMinutes;
        });
        video.on('end', () => {
            console.log('finshed downloading');
        });
        await pipeline(video, fs.createWriteStream(outputFile));
    }
}
