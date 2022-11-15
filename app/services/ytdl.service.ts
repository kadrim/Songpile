import * as fs from 'fs';
import * as path from "path";
import * as ytdl from "ytdl-core";
import * as readline from 'readline';

export class YTDLService {
    constructor() { }

    public downloadWithAudio(videoURL: string, outputFile: string) {
        const video = ytdl(videoURL, {
            quality: 'highestaudio',
        });

        let starttime;
        video.pipe(fs.createWriteStream(outputFile));
        video.once('response', () => {
            starttime = Date.now();
        });
        video.on('progress', (chunkLength, downloaded, total) => {
            const percent = downloaded / total;
            const downloadedMinutes = (Date.now() - starttime) / 1000 / 60;
            const estimatedDownloadTime = (downloadedMinutes / percent) - downloadedMinutes;
            readline.cursorTo(process.stdout, 0);
            process.stdout.write(`${(percent * 100).toFixed(2)}% downloaded `);
            process.stdout.write(`(${(downloaded / 1024 / 1024).toFixed(2)}MB of ${(total / 1024 / 1024).toFixed(2)}MB)\n`);
            process.stdout.write(`running for: ${downloadedMinutes.toFixed(2)}minutes`);
            process.stdout.write(`, estimated time left: ${estimatedDownloadTime.toFixed(2)}minutes `);
            readline.moveCursor(process.stdout, 0, -1);
        });
        video.on('end', () => {
            process.stdout.write('\n\n');
            process.stdout.write('Done!\n');
        });
    }

}