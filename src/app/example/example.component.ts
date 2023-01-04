import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ElectronService } from '../core/services/electron/electron.service';
import { FFmpegService } from '../core/services/electron/ffmpeg.service';
import { YTDLService } from '../core/services/electron/ytdl.service';
import * as path from 'path';
import * as fs from 'fs';

@Component({
  selector: 'app-home',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss']
})
export class ExampleComponent implements OnInit {

  path: typeof path;
  fs: typeof fs;
  private ffmpegService: FFmpegService;

  constructor(
    private router: Router,
    private electronService: ElectronService,
    private ytdlService: YTDLService
  ) {
    if (electronService.isElectron) {
      this.path = window.require('path');
      this.fs = window.require('fs');
      this.ffmpegService = FFmpegService.getInstance();
    }
  }

  ngOnInit(): void {
    console.log('ExampleComponent INIT');
  }

  protected async downloadAndConvert() {
    if (this.electronService.isElectron) {
      console.log('DOWNLOAD AND CONVERT');
      const videoData = await this.ytdlService.getVideoBufferWithAudio('https://www.youtube.com/watch?v=EngW7tLk6R8');
      console.log(videoData);
      console.log('CONVERTING!');
      const audioBuffer = await this.ffmpegService.convertToMp3Buffer(videoData);
      console.log(audioBuffer);
      const outFile = this.path.resolve('./out.mp3');
      console.log(outFile);
      this.fs.writeFileSync(outFile, audioBuffer);
    } else {
      console.log('CANNOT DO, run in browser');
    }
  }
}
