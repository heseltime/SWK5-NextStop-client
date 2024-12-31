import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchedulesComponent } from './schedules.component';
import { SchedulesRoutingModule } from './schedules-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SchedulesRoutingModule,
    SchedulesComponent, 
  ]
})
export class SchedulesModule { }
