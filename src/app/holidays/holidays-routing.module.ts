import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HolidaysComponent } from './holidays.component';
import { HolidayListComponent } from './holiday-list/holiday-list.component';
import { HolidayCreateComponent } from './holiday-create/holiday-create.component';
import { HolidayUpdateComponent } from './holiday-update/holiday-update.component';
import { RedirectAuthGuard } from '../guards/redirect-auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HolidaysComponent,
    canActivate: [RedirectAuthGuard], // Ensure authentication
    children: [
      { path: '', component: HolidayListComponent },
      { path: 'list', component: HolidayListComponent },
      { path: 'create', component: HolidayCreateComponent },
      { path: 'update', component: HolidayUpdateComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HolidaysRoutingModule {}
