import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ExampleComponent } from './example.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { ElectronService } from '../core/services/electron/electron.service';
import { YTDLService } from '../core/services/electron/ytdl.service';
import { FFmpegService } from '../core/services/electron/ffmpeg.service';
import { FakeElectronService } from '../core/services/electron/fake-electron.service';

describe('ExampleComponent', () => {
  let component: ExampleComponent;
  let fixture: ComponentFixture<ExampleComponent>;
  let electronService: FakeElectronService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ExampleComponent],
      providers: [
        { provide: ElectronService, useClass: FakeElectronService },
        YTDLService,
        { provide: FFmpegService, useValue: FFmpegService.getInstance(true) }
      ],
      imports: [TranslateModule.forRoot(), RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    electronService = TestBed.inject(ElectronService) as unknown as FakeElectronService;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title in a h1 tag', waitForAsync(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain(
      'PAGES.EXAMPLE.TITLE'
    );
  }));

  it('should show Hello World', () => {
    electronService.channelSource.next({
      channel: 'asynchronous-reply',
      params: ['Hello World']
    });
    expect(component.message).toEqual('Hello World');
  });

  it('should send a message', () => {
    const spy = spyOn(electronService.ipcRenderer, 'send');
    component.sendMessage('Hello World');
    const args = spy.calls.mostRecent().args;
    expect(args[0]).toBe('sendMessage');
    expect(args[1]).toEqual('Hello World');
  });
});
