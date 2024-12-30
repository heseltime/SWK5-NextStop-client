import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { AuthService } from '@auth0/auth0-angular';
import { ScheduleService } from './services/schedule.service';
import { StopService } from './services/stop.service';
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
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Next Stop KHG';
  private scheduleSubscription!: Subscription;

  stopId!: number;
  stopName!: string;

  scheduleId!: number;
  routeStopSchedules: ScheduleResponse['routeStopSchedules'] = [];
  stopNames: { [stopId: number]: string } = {}; // Cache for stop names

  constructor(
    public auth: AuthService,
    private scheduleService: ScheduleService,
    private stopService: StopService
  ) {}

  ngOnInit(): void {
    // Fetch data every 30 seconds
    this.scheduleSubscription = interval(30000).subscribe(() => {
      this.fetchNextConnections();
    });

    this.stopId = 11;

    // Fetch immediately on component load
    this.fetchNextConnections();
    this.fetchStopName(this.stopId);
  }

  ngOnDestroy(): void {
    if (this.scheduleSubscription) {
      this.scheduleSubscription.unsubscribe();
    }
  }

  fetchNextConnections(): void {
    this.scheduleService.getNextConnections(this.stopId).subscribe({
      next: (data: ScheduleResponse[]) => {
        this.scheduleId = data[0].scheduleId;
        this.routeStopSchedules = data[0].routeStopSchedules;

        // Fetch names for all stops in the route
        this.routeStopSchedules.forEach((stop) => {
          if (!this.stopNames[stop.stopId]) {
            this.fetchStopNameForId(stop.stopId);
          }
        });
      },
      error: (err) => console.error('Error fetching connections:', err),
    });
  }

  fetchStopNameForId(stopId: number): void {
    this.stopService.getStopById(stopId).subscribe({
      next: (stop) => {
        this.stopNames[stopId] = stop.name;
      },
      error: (err) => console.error(`Error fetching stop name for ID ${stopId}:`, err),
    });
  }

  fetchStopName(stopId: number): void {
    this.stopService.getStopById(stopId).subscribe({
      next: (stop) => {
        this.stopName = stop.name;
        this.title = this.stopName;
      },
      error: (err) => console.error('Error fetching stop:', err),
    });
  }

  login(): void {
    this.auth.loginWithRedirect();
  }

  logout(): void {
    this.auth.logout({ logoutParams: { returnTo: window.location.origin } });
  }
}
