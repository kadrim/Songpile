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

  static readonly minAudioBitrate = 96;
  static readonly maxAudioBitrate = 320;
  static readonly defaultAudioBitrate = 192;

  private static readonly storageFilename = 'settings';
  private static readonly storagePath = 'userData';
  private static readonly defaultExportPath = 'music';

  private storage: typeof ElectronJsonStorage;
  private settings: Settings;

  constructor(
    private electronService: ElectronService
  ) {
    if (this.electronService.isElectron) {
      this.storage = window.require('electron-json-storage');
      this.loadSettings();
    }
  }

  async getSettings(): Promise<Settings> {
    return this.settings;
  }

  async setSettings(settings: Settings): Promise<Settings> {
    this.settings = settings;
    await this.sanitizeSettings();
    await this.saveSettings();

    return this.settings;
  }

  private async loadSettings() {
    this.storage.setDataPath(await this.electronService.ipcRenderer.invoke('getPath', SettingsService.storagePath));
    this.settings = await this.storage.getSync(SettingsService.storageFilename) as Settings;
    const dirty = await this.sanitizeSettings();
    if(dirty) {
      this.saveSettings();
    }
  }

  private async saveSettings() {
    this.storage.setDataPath(await this.electronService.ipcRenderer.invoke('getPath', SettingsService.storagePath));
    return new Promise(resolve => {
      this.storage.set(SettingsService.storageFilename, this.settings, (error) => {
        if (error !== undefined) {
          throw error;
        }
        resolve(null);
      });
    });
  }

  private async sanitizeSettings() {
    let dirty = false;
    if (
      this.settings.exportPath === undefined ||
      this.settings.exportPath === ''
    ) {
      this.settings.exportPath = await this.electronService.ipcRenderer.invoke('getPath', SettingsService.defaultExportPath);
      dirty = true;
    }

    if (
      this.settings.audioBitrate === undefined ||
      this.settings.audioBitrate < SettingsService.minAudioBitrate ||
      this.settings.audioBitrate > SettingsService.maxAudioBitrate
    ) {
      this.settings.audioBitrate = SettingsService.defaultAudioBitrate;
      dirty = true;
    }

    return dirty;
  }
}
