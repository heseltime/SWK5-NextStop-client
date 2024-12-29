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
  selector: 'app-holiday-create',
  standalone: true,
  templateUrl: './holiday-create.component.html',
  styleUrls: ['./holiday-create.component.css'],
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
export class HolidayCreateComponent {
  holidayForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private holidayService: HolidayService) {
    this.holidayForm = this.fb.group({
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

    const newHoliday = this.holidayForm.value;

    this.holidayService.createHoliday(newHoliday).subscribe({
      next: (data) => {
        console.log('Holiday created successfully:', data);
        alert('Holiday created successfully!');
        this.holidayForm.reset();
        this.submitted = false;
      },
      error: (err) => {
        console.error('Error creating holiday:', err);
        alert('Failed to create the holiday.');
      },
    });
  }
}
