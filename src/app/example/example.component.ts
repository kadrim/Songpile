import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ElectronService } from '../core/services/electron/electron.service';
import { FFmpegService } from '../core/services/electron/ffmpeg.service';
import { YTDLService } from '../core/services/electron/ytdl.service';
import * as path from 'path';
import * as fs from 'fs';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss']
})
export class ExampleComponent implements OnInit {

  message: string;
  path: typeof path;
  fs: typeof fs;
  private ffmpegService: FFmpegService;

  constructor(
    private router: Router,
    private electronService: ElectronService,
    private ytdlService: YTDLService
  ) {
    this.electronService.ipcRenderer.on('asynchronous-reply', (event: Electron.IpcRendererEvent, arg: string) => {
      this.message = arg;
    });

    if (electronService.isElectron) {
      this.path = window.require('path');
      this.fs = window.require('fs');
      this.ffmpegService = FFmpegService.getInstance();
    }
  }

  ngOnInit(): void {
    console.log('ExampleComponent INIT');
  }

  sendMessage(msg: string) {
    this.electronService.ipcRenderer.send('sendMessage', msg);
  }

  protected async downloadAndConvert() {
    if (this.electronService.isElectron) {
      const videoData = await this.ytdlService.getVideoBufferWithAudio('https://www.youtube.com/watch?v=EngW7tLk6R8');
      const audioBuffer = await this.ffmpegService.convertToMp3Buffer(videoData);
      const outFile = this.path.resolve('./out.mp3');
      this.fs.writeFileSync(outFile, audioBuffer);
      console.log(`Wrote converted file to ${outFile}`);
    } else {
      console.error('Cannot comply, running in browser...');
    }
  }
}
