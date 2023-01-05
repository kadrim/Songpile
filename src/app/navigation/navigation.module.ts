import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavigationRoutingModule } from './navigation-routing.module';

import { SharedModule } from '../shared/shared.module';
import { NavigationComponent } from './navigation.component';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [NavigationComponent],
  imports: [
    CommonModule,
    SharedModule,
    NavigationRoutingModule,
    MatListModule,
    MatIconModule
  ],
  exports: [NavigationComponent]
})
export class NavigationModule {}
