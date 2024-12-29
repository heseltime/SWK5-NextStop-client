import { Routes } from '@angular/router';
import { HolidayListComponent } from './holidays/holiday-list/holiday-list.component';

export const routes: Routes = [
    { path: 'holidays', loadChildren: () => import('./holidays/holidays.module').then(m => m.HolidaysModule) },
    { path: '**', redirectTo: '' },
  ];  
