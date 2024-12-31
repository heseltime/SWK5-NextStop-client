import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutesRoutingModule } from './routes-routing.module';
import { RoutesComponent } from './routes.component'; // Import the standalone component

@NgModule({
  imports: [
    CommonModule,
    RoutesRoutingModule,
    RoutesComponent, // Import the standalone component here
  ],
})
export class RoutesModule {}
