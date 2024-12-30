import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StopService } from '../../services/stop.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-stop-update',
  standalone: true,
  templateUrl: './stop-update.component.html',
  styleUrls: ['./stop-update.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class StopUpdateComponent {
  stopForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private stopService: StopService) {
    this.stopForm = this.fb.group({
      stopId: ['', [Validators.required]], // ID to specify which stop to update
      name: ['', [Validators.required, Validators.minLength(3)]],
      shortName: ['', Validators.required],
      gpsCoordinates: ['48.3358, 14.3173'], // Default value
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.stopForm.invalid) {
      return;
    }

    const updatedStop = this.stopForm.value;

    this.stopService.updateStop(updatedStop.stopId, updatedStop).subscribe({
      next: (data) => {
        console.log('Stop updated successfully:', data);
        alert('Stop updated successfully!');
        this.stopForm.reset();
        this.submitted = false;
      },
      error: (err) => {
        console.error('Error updating stop:', err);
        alert('Failed to update the stop.');
      },
    });
  }
}
