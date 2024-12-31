import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-routes',
  standalone: true,
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.css'],
  imports: [RouterModule], // Import RouterModule here
})
export class RoutesComponent {}
