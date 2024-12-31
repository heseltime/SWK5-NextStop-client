import { Component, OnInit } from '@angular/core';
import { ScheduleService } from '../../services/schedule.service';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-schedules-list',
  standalone: true,
  templateUrl: './schedules-list.component.html',
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
  ],
  styleUrls: ['./schedules-list.component.css'],
})
export class SchedulesListComponent implements OnInit {
  schedules: any[] = [];
  displayedColumns: string[] = ['scheduleId', 'routeId', 'date', 'routeStopSchedules'];

  constructor(private scheduleService: ScheduleService) {}

  ngOnInit(): void {
    this.scheduleService.getAllSchedules().subscribe({
      next: (data) => {
        this.schedules = data;
        console.log(data);
      },
      error: (err) => {
        console.error('Error fetching schedules:', err);
      },
    });
  }
}
