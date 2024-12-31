import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouteService } from '../../services/route.service';
import { ScheduleService } from '../../services/schedule.service';

@Component({
  selector: 'app-schedules-create',
  standalone: true,
  templateUrl: './schedules-create.component.html',
  styleUrls: ['./schedules-create.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class SchedulesCreateComponent implements OnInit {
  scheduleForm: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private routeService: RouteService,
    private scheduleService: ScheduleService
  ) {
    this.scheduleForm = this.fb.group({
      scheduleId: [0],
      routeId: [1, Validators.required],
      date: [this.getTomorrowDate(), Validators.required],
      validityStart: [this.getTomorrowDate(), Validators.required], // Default to tomorrow
      validityStop: [this.getTomorrowDate(), Validators.required], // Default to tomorrow
      routeStopSchedules: this.fb.array([]),
    });
        
  }

  getTomorrowDate(): string {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    return tomorrow.toISOString().split('T')[0]; // Format as 'YYYY-MM-DD'
  }
  

  ngOnInit(): void {
    this.updateStopsByRouteId(1);
  
    this.scheduleForm.get('routeId')?.valueChanges.subscribe((routeId) => {
      if (routeId) {
        this.updateStopsByRouteId(routeId);
      }
    });
  }

  get routeStopSchedules(): FormArray {
    return this.scheduleForm.get('routeStopSchedules') as FormArray;
  }

  private updateStopsByRouteId(routeId: number): void {
    this.routeService.getRouteById(routeId).subscribe({
      next: (route) => {
        this.routeStopSchedules.clear(); // Clear existing stops
        route.routeStops.forEach((stop: any) => {
          this.routeStopSchedules.push(
            this.fb.group({
              stopId: [
                { value: Number(stop.stopId), disabled: true }, // Ensure stopId is a number
              ],
              sequenceNumber: [
                { value: Number(stop.sequenceNumber), disabled: true }, // Ensure sequenceNumber is a number
              ],
              time: ['12:30', [Validators.required]], // Default input as a string
            })
          );
        });
      },
      error: (err) => {
        console.error('Error fetching route:', err);
        alert('Failed to fetch route stops. Please check the route ID.');
      },
    });
  }
  
  
  logForm(): void {
    console.log('Form Data:', this.scheduleForm.getRawValue());
    console.log('Form Valid:', this.scheduleForm.valid);
  }

  onSubmit() {
    this.submitted = true;
  
    if (this.scheduleForm.invalid) {
      console.error('Form is invalid:', this.scheduleForm);
      return;
    }
  
    const rawSchedule = this.scheduleForm.getRawValue();
  
    const transformedSchedule = {
      ...rawSchedule,
      date: `${rawSchedule.date}T00:00:00.000Z`,
      validity_start: `${rawSchedule.validity_start}T00:00:00.000Z`,
      validity_stop: `${rawSchedule.validity_stop}T00:00:00.000Z`,
      routeStopSchedules: rawSchedule.routeStopSchedules.map((stop: any) => {
        const [hour, minute] = stop.time.split(':').map(Number);
        return {
          ...stop,
          time: { hour, minute },
        };
      }),
    };
  
    console.log("Transformed form data to be submitted:");
    console.log(transformedSchedule);
  
    this.scheduleService.createSchedule(transformedSchedule).subscribe({
      next: (data) => {
        console.log('Schedule created successfully:', data);
        alert('Schedule created successfully!');
        this.scheduleForm.reset();
        this.routeStopSchedules.clear();
        this.scheduleForm.patchValue({ scheduleId: 0, routeId: 1 });
        this.submitted = false;
      },
      error: (err) => {
        console.error('Error creating schedule:', err);
        alert('Failed to create the schedule.');
      },
    });
  }

  getStopFormGroup(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }
}
