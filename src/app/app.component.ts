import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { ScheduleService } from './services/schedule.service';
import { StopService } from './services/stop.service';
import { RouteService } from './services/route.service';
import { interval, Subscription } from 'rxjs';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule, FormsModule, MatSelectModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Next Stop KHG';
  private scheduleSubscription!: Subscription;

  stopId!: number;
  stopName!: string;

  routeId: number = 1;
  routeData: any;
  routeName: string = '';

  scheduleId!: number;
  routeStopSchedules: Array<{ stopId: number; sequenceNumber: number; time: string }> = [];
  stopList: Array<{ stopId: number; name: string }> = [];
  stopNames: { [stopId: number]: string } = {};

  constructor(
    public auth: AuthService,
    private scheduleService: ScheduleService,
    private stopService: StopService,
    private routeService: RouteService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Fetch all stops at the start
    this.fetchAllStops();

    // Read stopId from query params
    this.route.queryParams.subscribe((params) => {
      const stopIdParam = params['stopId'];
      if (stopIdParam) {
        this.stopId = +stopIdParam; // Use the provided stopId
      } else {
        // Set a random stopId after stops are loaded
        this.stopId = 11; // Temporary, will be set in fetchAllStops
      }
    });

    // Fetch data every 30 seconds
    this.scheduleSubscription = interval(30000).subscribe(() => {
      this.fetchNextConnections();
    });
  }

  ngOnDestroy(): void {
    if (this.scheduleSubscription) {
      this.scheduleSubscription.unsubscribe();
    }
  }

  fetchAllStops(): void {
    this.stopService.getAllStops().subscribe({
      next: (stops) => {
        this.stopList = stops;

        // Populate the stopNames object
        stops.forEach((stop) => {
          this.stopNames[stop.stopId] = stop.name;
        });

        // Set stopId to a random value if not provided
        if (!this.stopId) {
          const randomStop = stops[Math.floor(Math.random() * stops.length)];
          this.stopId = randomStop.stopId;
        }

        // Set stopName and title
        const selectedStop = stops.find((stop) => stop.stopId === this.stopId);
        if (selectedStop) {
          this.stopName = selectedStop.name;
          this.title = this.stopName;
        }

        // Fetch the initial connections
        this.fetchNextConnections();
      },
      error: (err) => console.error('Error fetching all stops:', err),
    });
  }

  fetchNextConnections(): void {
    this.scheduleService.getNextConnections(this.stopId).subscribe({
      next: (data) => {
        this.scheduleId = data[0]?.scheduleId;
        this.routeStopSchedules = data[0]?.routeStopSchedules || [];
        this.fetchRouteDetails(data[0]?.routeId);
      },
      error: (err) => console.error('Error fetching connections:', err),
    });
  }

  onStopChange(selectedValue: number): void {
    if (selectedValue) {
      this.stopId = selectedValue; // Set stopId to the selected value

      const selectedStop = this.stopList.find((stop) => stop.stopId === this.stopId);
      this.stopName = selectedStop?.name || 'Unknown Stop';
      this.title = this.stopName;

      // Update query parameter
      this.router.navigate([], {
        queryParams: { stopId: this.stopId },
        queryParamsHandling: 'merge', // Merge with existing query params
      });

      this.fetchNextConnections();
    }
  }

  fetchRouteDetails(routeId: number): void {
    this.routeService.getRouteById(routeId).subscribe(
      (route) => {
        this.routeData = route;
        this.routeName = route.routeNumber;
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
