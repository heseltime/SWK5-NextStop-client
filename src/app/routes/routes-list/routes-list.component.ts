import { Component, OnInit } from '@angular/core';
import { RouteService } from '../../services/route.service';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-routes-list',
  standalone: true,
  templateUrl: './routes-list.component.html',
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
  ],
  styleUrls: ['./routes-list.component.css'],
})
export class RoutesListComponent implements OnInit {
  routes: any[] = [];
  displayedColumns: string[] = ['routeId', 'routeNumber', 'validityPeriod', 'dayValidity'];

  constructor(private routeService: RouteService) {}

  ngOnInit(): void {
    this.routeService.getAllRoutes().subscribe({
      next: (data) => {
        this.routes = data;
        console.log(data);
      },
      error: (err) => {
        console.error('Error fetching routes:', err);
      },
    });
  }
}
