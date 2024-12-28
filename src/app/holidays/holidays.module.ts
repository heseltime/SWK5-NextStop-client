import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HolidayListComponent } from './holiday-list/holiday-list.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: HolidayListComponent }, // Route for '/holidays'
    ]),
    HolidayListComponent, // Import the standalone component
  ],
})
export class HolidaysModule {}
