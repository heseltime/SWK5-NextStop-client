import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StopService } from '../../services/stop.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-stop-create',
  standalone: true,
  templateUrl: './stop-create.component.html',
  styleUrls: ['./stop-create.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class StopCreateComponent {
  stopForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private stopService: StopService) {
    this.stopForm = this.fb.group({
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

    const newStop = this.stopForm.value;

    this.stopService.createStop(newStop).subscribe({
      next: (data) => {
        console.log('Stop created successfully:', data);
        alert('Stop created successfully!');
        this.stopForm.reset();
        this.stopForm.patchValue({ gpsCoordinates: '48.3358, 14.3173' }); // Reset GPS to default
        this.submitted = false;
      },
      error: (err) => {
        console.error('Error creating stop:', err);
        alert('Failed to create the stop.');
      },
    });
  }
}
