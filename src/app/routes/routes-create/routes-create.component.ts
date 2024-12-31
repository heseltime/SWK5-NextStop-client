import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouteService } from '../../services/route.service';

@Component({
  selector: 'app-routes-create',
  standalone: true,
  templateUrl: './routes-create.component.html',
  styleUrls: ['./routes-create.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class RoutesCreateComponent {
  routeForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private routeService: RouteService) {
    this.routeForm = this.fb.group({
      routeId: [0, Validators.required], // Default value for new routes
      routeNumber: ['', [Validators.required, Validators.minLength(3)]],
      validityPeriod: ['', Validators.required],
      dayValidity: ['', Validators.required],
      companyId: [0, Validators.required], // Default value
      companyName: ['', Validators.required],
      routeStops: this.fb.array([]), // Dynamic list of stops
    });
  }

  get routeStops(): FormArray {
    return this.routeForm.get('routeStops') as FormArray;
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

  onSubmit() {
    this.submitted = true;

    if (this.routeForm.invalid) {
      return;
    }

    const newRoute = this.routeForm.value;

    this.routeService.createRoute(newRoute).subscribe({
      next: (data) => {
        console.log('Route created successfully:', data);
        alert('Route created successfully!');
        this.routeForm.reset();
        this.routeStops.clear(); // Clear stops array after successful submission
        this.routeForm.patchValue({ routeId: 0, companyId: 0 }); // Reset defaults
        this.submitted = false;
      },
      error: (err) => {
        console.error('Error creating route:', err);
        alert('Failed to create the route.');
      },
    });
  }
}
