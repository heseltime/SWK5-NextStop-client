import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { AuthService } from '@auth0/auth0-angular';
import { ScheduleService } from './services/schedule.service'; // Import the service
import { interval, Subscription } from 'rxjs';

export interface ScheduleResponse {
  scheduleId: number;
  routeId: number;
  date: string;
  routeStopSchedules: Array<{
    stopId: number;
    sequenceNumber: number;
    time: string;
  }>;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    CommonModule, // Add CommonModule for async pipe
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Next Stop KHG';
  private scheduleSubscription!: Subscription;

  scheduleId!: number; // Holds the schedule ID
  routeStopSchedules: ScheduleResponse['routeStopSchedules'] = []; // Holds route stop schedules

  constructor(public auth: AuthService, private scheduleService: ScheduleService) {}

  ngOnInit(): void {
    // Fetch data every 30 seconds
    this.scheduleSubscription = interval(30000).subscribe(() => {
      this.fetchNextConnections();
    });

    // Fetch immediately on component load
    this.fetchNextConnections();
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    if (this.scheduleSubscription) {
      this.scheduleSubscription.unsubscribe();
    }
  }

  fetchNextConnections(): void {
    const stopId = 11; // Replace with the actual stop ID
    this.scheduleService.getNextConnections(stopId).subscribe({
      next: (data: ScheduleResponse[]) => {
        console.log('Full API Response:', data);

        // Extract data using the typed response: comes back as array
        this.scheduleId = data[0].scheduleId;
        this.routeStopSchedules = data[0].routeStopSchedules;

        console.log('Extracted scheduleId:', this.scheduleId);
        console.log('Extracted routeStopSchedules:', this.routeStopSchedules);
      },
      error: (err) => console.error('Error fetching connections:', err),
    });
  }

  login(): void {
    this.auth.loginWithRedirect();
  }

  logout(): void {
    this.auth.logout({ logoutParams: { returnTo: window.location.origin } });
  }
}
