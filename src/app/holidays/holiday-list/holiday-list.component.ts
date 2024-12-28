import { Component, OnInit } from '@angular/core';
import { HolidayService } from '../../services/holiday.service';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-holiday-list',
  templateUrl: './holiday-list.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    RouterModule,
  ],
  styleUrls: ['./holiday-list.component.css'],
})
export class HolidayListComponent implements OnInit {
  holidays: any[] = [];
  displayedColumns: string[] = ['id', 'description', 'date'];

  constructor(private holidayService: HolidayService) {}

  ngOnInit(): void {
    this.holidayService.getAllHolidays().subscribe({
      next: (data) => {
        this.holidays = data;
      },
      error: (err) => {
        console.error('Error fetching holidays:', err);
      },
    });
  }
}
