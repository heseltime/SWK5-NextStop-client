import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StopsComponent } from './stops.component';
import { StopListComponent } from './stop-list/stop-list.component';
import { StopCreateComponent } from './stop-create/stop-create.component';
import { StopUpdateComponent } from './stop-update/stop-update.component';
import { RedirectAuthGuard } from '../guards/redirect-auth.guard';

const routes: Routes = [
  {
    path: '',
    component: StopsComponent,
    canActivate: [RedirectAuthGuard], // Ensure authentication
    children: [
      { path: '', component: StopListComponent },
      { path: 'list', component: StopListComponent },
      { path: 'create', component: StopCreateComponent },
      { path: 'update', component: StopUpdateComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StopsRoutingModule {}
