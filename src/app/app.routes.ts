import { Routes } from '@angular/router';
import { HolidayListComponent } from './holidays/holiday-list/holiday-list.component';

export const routes: Routes = [
    { path: 'holidays', loadChildren: () => import('./holidays/holidays.module').then(m => m.HolidaysModule) },
    { path: 'stops', loadChildren: () => import('./stops/stops.module').then(m => m.StopsModule) },
    { path: 'routes', loadChildren: () => import('./routes/routes.module').then(m => m.RoutesModule) },
    { path: 'schedules', loadChildren: () => import('./schedules/schedules.module').then(m => m.SchedulesModule) },
    { path: '**', redirectTo: '' },
  ];  
