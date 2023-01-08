import { Injectable } from '@angular/core';
import { ElectronService } from './electron.service';
import * as ElectronJsonStorage from 'electron-json-storage';

export interface Settings {
  exportPath: string;
  audioBitrate: number;
}

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  storage: typeof ElectronJsonStorage;
  settings: Settings;

  constructor(
    private electronService: ElectronService
  ) {
    this.storage = window.require('electron-json-storage');
    this.loadSettings();
  }

  private async loadSettings() {
    this.storage.setDataPath(await this.electronService.ipcRenderer.invoke('getPath', 'userData'));
    const settings = await this.storage.getSync('settings');
  }
}
