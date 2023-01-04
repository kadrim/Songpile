import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExampleRoutingModule } from './example-routing.module';

import { ExampleComponent } from './example.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ExampleComponent],
  imports: [CommonModule, SharedModule, ExampleRoutingModule]
})
export class ExampleModule {}
