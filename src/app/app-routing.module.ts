import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HolidayListComponent } from './holidays/holiday-list/holiday-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'holidays', pathMatch: 'full' }, // Redirect root to 'holidays'
  { path: 'holidays', component: HolidayListComponent },
  { path: '**', redirectTo: 'holidays' }, // Handle unknown routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}