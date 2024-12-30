import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StopsRoutingModule } from './stops-routing.module';
import { StopsComponent } from './stops.component';


@NgModule({
  declarations: [
    StopsComponent
  ],
  imports: [
    CommonModule,
    StopsRoutingModule
  ]
})
export class StopsModule { }
