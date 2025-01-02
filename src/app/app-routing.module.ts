import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'holidays', pathMatch: 'full' }, // Redirect root to 'holidays'
  { path: 'holidays', loadChildren: () => import('./holidays/holidays.module').then(m => m.HolidaysModule) },
  { path: 'stops', loadChildren: () => import('./stops/stops.module').then(m => m.StopsModule) },
  { path: 'routes', loadChildren: () => import('./routes/routes.module').then(m => m.RoutesModule) },
  { path: 'schedules', loadChildren: () => import('./schedules/schedules.module').then(m => m.SchedulesModule) },
  { path: '**', redirectTo: 'holidays' }, // Catch-all route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
