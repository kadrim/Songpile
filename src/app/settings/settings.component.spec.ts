import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SettingsComponent } from './settings.component';
import { TranslateModule } from '@ngx-translate/core';

import { RouterTestingModule } from '@angular/router/testing';
import { ElectronService } from '../core/services';
import { FakeElectronService } from '../core/services/electron/fake-electron.service';
import path from 'path';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;
  let electronService: FakeElectronService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsComponent],
      imports: [TranslateModule.forRoot(), RouterTestingModule],
      providers: [
        { provide: ElectronService, useClass: FakeElectronService }
      ]
    }).compileComponents();

    electronService = TestBed.inject(ElectronService) as unknown as FakeElectronService;

    // modify fake methods before creating the component
    electronService.ipcRenderer.invoke = async (channel: string, ...args: any[]): Promise<any> => {
      if(channel === 'getPath') {
        switch(args[0]) {
          case 'userData':
            return path.resolve('./dist/');
        }
      }

      throw new Error(`no handler for channel=${channel}!`);
    };

    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title in a h1 tag', waitForAsync(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain(
      'PAGES.SETTINGS.TITLE'
    );
  }));
});
