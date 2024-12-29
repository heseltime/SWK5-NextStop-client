import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HolidaysRoutingModule } from './holidays-routing.module'; // Import the routing module
import { HolidaysComponent } from './holidays.component';
import { HolidayListComponent } from './holiday-list/holiday-list.component';
import { HolidayCreateComponent } from './holiday-create/holiday-create.component';
import { HolidayUpdateComponent } from './holiday-update/holiday-update.component';

@NgModule({
  imports: [
    CommonModule,
    HolidaysRoutingModule,
  ],
})
export class HolidaysModule {}
