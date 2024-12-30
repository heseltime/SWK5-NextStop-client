import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { AuthService } from '@auth0/auth0-angular';
import { ScheduleService } from './services/schedule.service';
import { StopService } from './services/stop.service';
import { interval, Subscription } from 'rxjs';
import { RouteService } from './services/route.service';

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

  routeId: number = 1; // Example route ID
  routeData: any;
  routeName: string = "";

  scheduleId!: number;
  routeStopSchedules: ScheduleResponse['routeStopSchedules'] = [];
  stopNames: { [stopId: number]: string } = {}; // Cache for stop names

  constructor(
    public auth: AuthService,
    private scheduleService: ScheduleService,
    private stopService: StopService,
    private routeService: RouteService,
  ) {}

  ngOnInit(): void {
    // Fetch data every 30 seconds
    this.scheduleSubscription = interval(30000).subscribe(() => {
      this.fetchNextConnections();
    });

    this.stopId = 11; // maybe randomize

    this.fetchNextConnections(); // calls fetchRouteDetails
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

        // Also get route info
        this.fetchRouteDetails(data[0].routeId);
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

  fetchRouteDetails(routeId: number): void {
    this.routeService.getRouteById(routeId).subscribe(
      (route) => {
        this.routeData = route;
        this.routeName = route.routeNumber; // ..
        //console.log('Route Name:', this.routeName);
      },
      (error) => {
        console.error('Error fetching route:', error);
      }
    );
  }

  login(): void {
    this.auth.loginWithRedirect();
  }

  logout(): void {
    this.auth.logout({ logoutParams: { returnTo: window.location.origin } });
  }
}
