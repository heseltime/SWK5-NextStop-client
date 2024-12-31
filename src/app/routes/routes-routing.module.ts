import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RedirectAuthGuard } from '../guards/redirect-auth.guard';
import { RoutesComponent } from './routes.component'; // Standalone component
import { RoutesListComponent } from './routes-list/routes-list.component';
import { RoutesCreateComponent } from './routes-create/routes-create.component';
import { RoutesUpdateComponent } from './routes-update/routes-update.component';

const routes: Routes = [
  {
    path: '',
    component: RoutesComponent, // Use the standalone component here
    canActivate: [RedirectAuthGuard],
    children: [
      { path: '', component: RoutesListComponent },
      { path: 'list', component: RoutesListComponent },
      { path: 'create', component: RoutesCreateComponent },
      { path: 'update', component: RoutesUpdateComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoutesRoutingModule {}
