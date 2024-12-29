import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-holidays',
  standalone: true, // Ensure this is set to true for a standalone component
  imports: [RouterModule], // Import RouterModule to use RouterOutlet
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.css'],
})
export class HolidaysComponent {}
