import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouteService } from '../../services/route.service';
import { StopService } from '../../services/stop.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-routes-update',
  templateUrl: './routes-update.component.html',
  styleUrls: ['./routes-update.component.css'],
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    ReactiveFormsModule,
  ],
})
export class RoutesUpdateComponent implements OnInit {
  routeForm: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private routeService: RouteService,
    private stopService: StopService,
    private snackBar: MatSnackBar
  ) {
    this.routeForm = this.fb.group({
      routeId: [0, Validators.required], // Default routeId
      routeNumber: ['', [Validators.required, Validators.minLength(3)]],
      validityPeriod: ['', Validators.required],
      dayValidity: ['', Validators.required],
      companyId: [0, Validators.required], // Default companyId
      companyName: ['', Validators.required],
      routeStops: this.fb.array([]), // Dynamic list of stops
    });
  }

  ngOnInit(): void {
    this.setupRouteIdChangeListener();
    this.loadRoute(1); // Default route ID
  }

  get routeStops(): FormArray {
    return this.routeForm.get('routeStops') as FormArray;
  }

  private setupRouteIdChangeListener(): void {
    this.routeForm.get('routeId')?.valueChanges
      .pipe(
        debounceTime(300), // Delay API call by 300 ms
        distinctUntilChanged() // Ignore duplicate values
      )
      .subscribe((newRouteId) => {
        if (newRouteId) {
          this.loadRoute(newRouteId); // Load route data after debounce
        }
      });
  }

  private loadRoute(routeId: number): void {
    this.routeService.getRouteById(routeId).subscribe({
      next: (route) => {
        this.routeForm.patchValue({
          routeId: route.routeId,
          routeNumber: route.routeNumber,
          validityPeriod: route.validityPeriod,
          dayValidity: route.dayValidity,
          companyId: route.companyId,
          companyName: route.companyName,
        });

        this.routeStops.clear(); // Clear existing stops
        route.routeStops.forEach((stop: any) => {
          this.routeStops.push(
            this.fb.group({
              stopId: [stop.stopId, Validators.required],
              sequenceNumber: [stop.sequenceNumber, Validators.required],
            })
          );
        });
      },
      error: (err) => {
        console.error('Error loading route:', err);
        this.snackBar.open('Failed to load route details.', 'Close', {
          duration: 3000,
        });
      },
    });
  }

  addStop(): void {
    this.routeStops.push(
      this.fb.group({
        stopId: [0, Validators.required], // Default stopId
        sequenceNumber: [0, Validators.required], // Default sequenceNumber
      })
    );
  }

  removeStop(index: number): void {
    this.routeStops.removeAt(index);
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.routeForm.invalid) {
      return;
    }

    const updatedRoute = this.routeForm.value;

    this.routeService.updateRoute(updatedRoute.routeId, updatedRoute).subscribe({
      next: () => {
        this.snackBar.open('Route updated successfully!', 'Close', {
          duration: 3000,
        });
      },
      error: (err) => {
        console.error('Error updating route:', err);
        this.snackBar.open('Failed to update the route.', 'Close', {
          duration: 3000,
        });
      },
    });
  }
}
