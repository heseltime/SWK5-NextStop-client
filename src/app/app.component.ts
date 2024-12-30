import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { AuthService } from '@auth0/auth0-angular';
import { ScheduleService } from './services/schedule.service';
import { StopService } from './services/stop.service';
import { RouteService } from './services/route.service';
import { interval, Subscription } from 'rxjs';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule, FormsModule, MatSelectModule], // Add FormsModule here
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
  stopList: Array<{ stopId: number; name: string }> = []; // Full list of stops
  stopNames: { [stopId: number]: string } = {}; // Maps stopId to stopName

  constructor(
    public auth: AuthService,
    private scheduleService: ScheduleService,
    private stopService: StopService,
    private routeService: RouteService
  ) {}

  ngOnInit(): void {
    // Fetch all stops at the start
    this.fetchAllStops();

    // Fetch data every 30 seconds
    this.scheduleSubscription = interval(30000).subscribe(() => {
      this.fetchNextConnections();
    });

    this.stopId = 11; // Default stop ID
    this.fetchNextConnections();
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
  
        // Set default stop name and title if applicable
        const defaultStop = stops.find((stop) => stop.stopId === this.stopId);
        if (defaultStop) {
          this.stopName = defaultStop.name;
          this.title = this.stopName; // Set title to the default stop name
        }
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
      console.log(this.stopId);
  
      const selectedStop = this.stopList.find((stop) => stop.stopId === this.stopId);
      this.stopName = selectedStop?.name || 'Unknown Stop';
      this.title = this.stopName; // Update the title to the selected stop name
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
