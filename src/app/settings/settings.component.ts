import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../core/services/electron/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(private settingsService: SettingsService) { }

  ngOnInit(): void {
    console.log('SettingsComponent INIT');
  }

}
