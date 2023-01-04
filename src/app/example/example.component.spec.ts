import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ExampleComponent } from './example.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { ElectronService } from '../core/services/electron/electron.service';
import { YTDLService } from '../core/services/electron/ytdl.service';
import { FFmpegService } from '../core/services/electron/ffmpeg.service';

describe('ExampleComponent', () => {
  let component: ExampleComponent;
  let fixture: ComponentFixture<ExampleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ExampleComponent],
      providers: [
        ElectronService,
        YTDLService,
        { provide: FFmpegService, useValue: FFmpegService.getInstance(true) }
      ],
      imports: [TranslateModule.forRoot(), RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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
});
