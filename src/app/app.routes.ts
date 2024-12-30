import { Routes } from '@angular/router';
import { HolidayListComponent } from './holidays/holiday-list/holiday-list.component';

export const routes: Routes = [
    { path: 'holidays', loadChildren: () => import('./holidays/holidays.module').then(m => m.HolidaysModule) },
    { path: 'stops', loadChildren: () => import('./stops/stops.module').then(m => m.StopsModule) },
    { path: '**', redirectTo: 'holidays' },
  ];  
