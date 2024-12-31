import { Component, OnInit } from '@angular/core';
import { StopService } from '../../services/stop.service';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-stop-list',
  standalone: true,
  templateUrl: './stop-list.component.html',
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    RouterModule,
  ],
  styleUrls: ['./stop-list.component.css'],
})
export class StopListComponent implements OnInit {
  stops: any[] = [];
  displayedColumns: string[] = ['stopId', 'name'];

  constructor(private stopService: StopService) {}

  ngOnInit(): void {
    this.stopService.getAllStops().subscribe({
      next: (data) => {
        this.stops = data;
        //console.log(data);
      },
      error: (err) => {
        console.error('Error fetching stops:', err);
      },
    });
  }
}
