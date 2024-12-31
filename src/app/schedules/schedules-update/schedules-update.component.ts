import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouteService } from '../../services/route.service';
import { ScheduleService } from '../../services/schedule.service';
import { MatSelect } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-schedules-update',
  templateUrl: './schedules-update.component.html',
  styleUrls: ['./schedules-update.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelect,
    MatOptionModule,
  ],
})
export class SchedulesUpdateComponent implements OnInit {
  updateForm: FormGroup;
  schedules: any[] = [];
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private scheduleService: ScheduleService,
    private routeService: RouteService
  ) {
    this.updateForm = this.fb.group({
      scheduleId: [null, Validators.required],
      routeId: [null, Validators.required],
      date: ['', Validators.required],
      validityStart: ['', Validators.required],
      validityStop: ['', Validators.required],
      routeStopSchedules: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    // Fetch all schedules
    this.scheduleService.getAllSchedules().subscribe({
      next: (data) => (this.schedules = data),
      error: (err) => console.error('Error fetching schedules:', err),
    });

    // Listen to routeId changes
    this.updateForm.get('routeId')?.valueChanges.subscribe((routeId) => {
      if (routeId) {
        this.updateStopsByRouteId(routeId);
      }
    });
  }

  // Update stops when routeId changes
  private updateStopsByRouteId(routeId: number): void {
    this.routeService.getRouteById(routeId).subscribe({
      next: (route) => {
        // Clear existing stops
        this.routeStopSchedules.clear();

        // Add new stops
        route.routeStops.forEach((stop: any) => {
          this.routeStopSchedules.push(
            this.fb.group({
              stopId: [{ value: stop.stopId, disabled: true }],
              sequenceNumber: [{ value: stop.sequenceNumber, disabled: true }],
              time: ['12:30', Validators.required], // Default time value
            })
          );
        });
      },
      error: (err) => console.error('Error fetching route stops:', err),
    });
  }

  onScheduleSelect(scheduleId: number): void {
    if (!scheduleId) return;

    this.scheduleService.getScheduleById(scheduleId).subscribe({
      next: (schedule) => {
        // Populate the form
        this.updateForm.patchValue({
          scheduleId: schedule.scheduleId,
          routeId: schedule.routeId,
          date: schedule.date.split('T')[0],
          validityStart: schedule.validityStart.split('T')[0],
          validityStop: schedule.validityStop.split('T')[0],
        });

        // Populate stops
        this.routeStopSchedules.clear();
        schedule.routeStopSchedules.forEach((stop: any) => {
          this.routeStopSchedules.push(
            this.fb.group({
              stopId: [{ value: stop.stopId, disabled: true }],
              sequenceNumber: [{ value: stop.sequenceNumber, disabled: true }],
              time: [this.formatTime(stop.time)], // Format time as HH:mm
            })
          );
        });
      },
      error: (err) => console.error('Error fetching schedule details:', err),
    });
  }

  private formatTime(time: { hour: number; minute: number }): string {
    const pad = (num: number) => (num < 10 ? `0${num}` : `${num}`);
    return `${pad(time.hour)}:${pad(time.minute)}`;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.updateForm.invalid) {
      console.error('Form is invalid:', this.updateForm);
      return;
    }

    const rawData = this.updateForm.getRawValue();
    const transformedData = {
      ...rawData,
      date: `${rawData.date}T00:00:00.000Z`,
      validityStart: `${rawData.validityStart}T00:00:00.000Z`,
      validityStop: `${rawData.validityStop}T00:00:00.000Z`,
      routeStopSchedules: rawData.routeStopSchedules.map((stop: any) => {
        const [hour, minute] = stop.time.split(':').map(Number);
        return {
          ...stop,
          time: { hour, minute },
        };
      }),
    };

    this.scheduleService.updateSchedule(transformedData.scheduleId, transformedData).subscribe({
      next: () => {
        alert('Schedule updated successfully!');
        this.submitted = false;
      },
      error: (err) => {
        console.error('Error updating schedule:', err);
        alert('Failed to update the schedule.');
      },
    });
  }

  get routeStopSchedules(): FormArray {
    return this.updateForm.get('routeStopSchedules') as FormArray;
  }
}
