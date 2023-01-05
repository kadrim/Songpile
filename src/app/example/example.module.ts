import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExampleRoutingModule } from './example-routing.module';

import { ExampleComponent } from './example.component';
import { SharedModule } from '../shared/shared.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ExampleComponent],
  imports: [CommonModule, SharedModule, ExampleRoutingModule, MatButtonModule]
})
export class ExampleModule {}
