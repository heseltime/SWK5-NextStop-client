import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HolidayService } from '../../services/holiday.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-holiday-update',
  standalone: true,
  templateUrl: './holiday-update.component.html',
  styleUrls: ['./holiday-update.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
  ],
})
export class HolidayUpdateComponent {
  holidayForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private holidayService: HolidayService) {
    this.holidayForm = this.fb.group({
      id: ['', [Validators.required]], // ID field to specify which holiday to update
      description: ['', [Validators.required, Validators.minLength(3)]],
      date: ['', Validators.required],
      isSchoolBreak: [false],
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.holidayForm.invalid) {
      return;
    }

    const updatedHoliday = this.holidayForm.value;

    this.holidayService.updateHoliday(updatedHoliday.id, updatedHoliday).subscribe({
      next: (data) => {
        console.log('Holiday updated successfully:', data);
        alert('Holiday updated successfully!');
        this.holidayForm.reset();
        this.submitted = false;
      },
      error: (err) => {
        console.error('Error updating holiday:', err);
        alert('Failed to update the holiday.');
      },
    });
  }
}
