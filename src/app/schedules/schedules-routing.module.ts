import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RedirectAuthGuard } from '../guards/redirect-auth.guard';
import { SchedulesListComponent } from './schedules-list/schedules-list.component';
import { SchedulesCreateComponent } from './schedules-create/schedules-create.component';
import { SchedulesUpdateComponent } from './schedules-update/schedules-update.component';
import { SchedulesComponent } from './schedules.component';

const routes: Routes = [
  {
    path: '',
    component: SchedulesComponent,
    canActivate: [RedirectAuthGuard],
    children: [
      { path: '', component: SchedulesListComponent },
      { path: 'list', component: SchedulesListComponent },
      { path: 'create', component: SchedulesCreateComponent },
      { path: 'update', component: SchedulesUpdateComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchedulesRoutingModule {}
